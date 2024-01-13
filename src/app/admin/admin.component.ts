import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ROLE } from '../shared/constants/role.constant';
import { AccountService } from '../shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  public isAdminLogined = false;
  public authForm!: FormGroup;
  public loginSubscription!: Subscription;
  public currentUser: any;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  getPersonalData(): void {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUser = currentUserString ? JSON.parse(currentUserString) : undefined;
  }

  signInUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.authForm.reset();
      this.isAdminLogined = true;
      this.accountService.isUserLogin = true;
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
          this.isAdminLogined = true;
        }
        this.accountService.isUserLogin$.next(true);
        this.toastr.success('You have successfully logged into your account');
      },
      error: (err) => {
        this.toastr.error('Something went wrong');
        console.log(err.code, err.message);
      }
    })
  }

  logout(): void {
    this.isAdminLogined = false;
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin = false;
    this.accountService.isUserLogin$.next(true);
    this.toastr.success('You successfully signed out');
  }

}
