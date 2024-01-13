import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { ROLE } from '../../shared/constants/role.constant';
import { AccountService } from '../../shared/services/account/account.service';
import { ScheduleComponent } from '../../components/schedule/schedule.component';
import { IUser } from '../../shared/interfaces/user/user.interface';
import { UserExerciseService } from '../../shared/services/user-exercise/user-exercise.service';
import { IExerciseResponse } from '../../shared/interfaces/exercise/exercise.interface';
import { SlicePipe } from '../../shared/pipes/slice/slice.pipe';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICoachResponse } from '../../shared/interfaces/coach/coach.interface';
import { UserCoachService } from '../../shared/services/user-coach/user-coach.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, ScheduleComponent, SlicePipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  public userExerciseList: IExerciseResponse[] = [];
  public loginSubscription!: Subscription;
  public userCoach!: ICoachResponse;
  public authForm!: FormGroup;
  private registerData!: IUser;
  public currentUser: any;
  public isSignedIn = false;
  public isCorrectPassword = false;
  public isLoginUser = false;
  public isEditStatus = false;

  constructor(
    private accountService: AccountService,
    private userExerciseService: UserExerciseService,
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    private userCoachService: UserCoachService,
  ) {
    if (this.isLoginUser) {
      this.getPersonalData();
      this.getUserExercises();
    }
  }

  ngOnInit(): void {
    this.initAuthForm();
    this.checkUserToken();
    if (this.isLoginUser) {
      this.getPersonalData();
      this.getUserExercises();
      this.getUserCoach();
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmationPassword: [null, Validators.required],
    })
  }

  toggleRegistrationModal(): void {
    this.isSignedIn = !this.isSignedIn;
    this.authForm.reset();
  }

  getPersonalData(): void {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUser = currentUserString ? JSON.parse(currentUserString) : undefined;
  }

  getUserExercises(): void {
    this.getPersonalData();
    this.userExerciseService.getOneUser(this.currentUser.uid).subscribe(data => {
      const currentUserObject = data as IUser;
      this.userExerciseList = currentUserObject.userExercises.filter((exercise) => exercise.completed === false);
    });
  }

  checkUserToken(): void {
    if (localStorage.getItem('currentUser')) {
      this.isLoginUser = true;
    } else {
      this.isLoginUser = false;
    }
  }

  signOut(): void {
    this.isLoginUser = false;
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin = false;
    this.accountService.isUserLogin$.next(true);
    this.toastr.success('You successfully signed out');
    const timerId = setInterval(() => {
      window.location.reload();
      clearInterval(timerId);
    }, 500);
  }

  signInUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.authForm.reset();
      this.isLoginUser = true;
      this.accountService.isUserLogin = true;
      this.toastr.success('You have successfully logged into your account');
      const timerId = setInterval(() => {
        window.location.reload();
        clearInterval(timerId);
      }, 500);
    }).catch(err => {
      this.toastr.error('Incorrect email of password');
      console.log(err);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe({
      next: (user) => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.getPersonalData();
        if (user && user['role'] === ROLE.USER) {
          this.isLoginUser = true;
        }
        this.accountService.isUserLogin$.next(true);
      },
      error: (err) => {
        console.log(err.code, err.message);
      }
    })
  }

  signUpUser(): void {
    const { firstName, lastName, email, password, confirmationPassword } = this.authForm.value;
    this.registerData = this.authForm.value;
    this.signUp(firstName, lastName, email, password, confirmationPassword).then(() => {
      this.authForm.reset();
      this.isSignedIn = false;
      this.toastr.success('The account was successfully created');
    }).catch(err => {
      this.toastr.error('Something went wrong');
      console.log(err);
    })
  }

  async signUp(firstName: string, lastName: string, email: string, password: string, confirmationPassword: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      height: this.registerData.height,
      weight: this.registerData.weight,
      age: this.registerData.age,
      email: this.registerData.email,
      password: this.registerData.password,
      confirmationPassword: this.registerData.confirmationPassword,
      role: 'USER',
      planEvents: [],
      userExercises: [],
      sheduleWeeks: [],
      coaches: []
    }

    setDoc(doc(this.afs, 'users', credential.user.uid), user);

    await credential.user.reload();
  }

  checkConfirmPassword(): void {
    this.isCorrectPassword = this.password.value === this.confirmPassword.value;
    if (this.password.value !== this.confirmPassword.value) {
      this.authForm.controls['confirmationPassword'].setErrors({
        matchError: 'The password does not match the previous one'
      })
    }
  }

  get password(): AbstractControl {
    return this.authForm.controls['password'];
  }

  get confirmPassword(): AbstractControl {
    return this.authForm.controls['confirmationPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.authForm.controls[control].errors?.[name]
  }

  getUserCoach(): void {
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();
      this.userCoachService.getOneUser(this.currentUser.uid).subscribe(data => {
        const currentUserData = data as IUser;
        currentUserData.coaches.forEach((coach) => {
          this.userCoach = coach;
        })
      });
    }
  }

  deleteUserCoach(coach: ICoachResponse) {
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();
      this.userCoachService.deleteUserCoach(this.currentUser.uid, coach).then(() => {
        this.getUserCoach();
        this.toastr.success('Coach has been successfully deleted');
        const timerId = setInterval(() => {
          window.location.reload();
          clearInterval(timerId);
        }, 500);
      }).catch((error) => {
        console.log(error);
      })
    }
  }

}
