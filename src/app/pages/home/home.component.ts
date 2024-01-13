import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../../shared/services/exercise/exercise.service';
import { IExerciseResponse } from '../../shared/interfaces/exercise/exercise.interface';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserExerciseService } from '../../shared/services/user-exercise/user-exercise.service';
import { ScheduleComponent } from '../../components/schedule/schedule.component';
import { CoacherComponent } from '../../components/coacher/coacher.component';
import { SlicePipe } from '../../shared/pipes/slice/slice.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ScheduleComponent, CoacherComponent, SlicePipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  public userExercises: IExerciseResponse[] = [];
  public userAllCategories: ICategoryResponse[] = [];
  public eventSubscription!: Subscription;
  public userName!: string;
  public today!: string;
  public isUserSignedIn = false;

  constructor(
    private exerciseService: ExerciseService,
    private categoryService: CategoryService,
    private userExerciseService: UserExerciseService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getAllUserExercise();
        this.getAllUserCategories();
      }
    })
  }

  ngOnInit(): void {
    this.getUserName();
    this.getTodayDate();
    this.checkIfUserSignedIn();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  checkIfUserSignedIn(): void {
    if (localStorage.getItem('currentUser')) {
      this.isUserSignedIn = true;
    } else {
      this.isUserSignedIn = false;
    }
  }

  getUserName(): void {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : undefined;
    if (currentUser) {
      this.userName = currentUser.firstName;
    }
  }

  getTodayDate(): void {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[currentDate.getMonth()];
    const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekName = dayOfWeekNames[currentDate.getDay()];

    this.today = `${dayOfMonth} ${dayOfWeekName} ${monthName}`;
  }

  getAllUserExercise(): void {
    this.exerciseService.getAllExercises().subscribe(data => {
      this.userExercises = data as IExerciseResponse[];
    })
  }

  getAllUserCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.userAllCategories = data as ICategoryResponse[];
    })
  }

  onCategoryChange(event: any): void {
    const selectedCategory = event.target.textContent;
    if (selectedCategory === 'ALL') {
      this.exerciseService.getAllExercises().subscribe(data => {
        this.userExercises = data as IExerciseResponse[];
      })
    } else {
      this.exerciseService.getAllExercisesByCategory(selectedCategory).subscribe(data => {
        this.userExercises = data as IExerciseResponse[];
      })
    }
  }

  addExerciseToUser(exercise: IExerciseResponse): void {
    if (localStorage.getItem('currentUser')) {
      const currentUserString = localStorage.getItem('currentUser');
      const currentUser = currentUserString ? JSON.parse(currentUserString) : undefined;
      this.userExerciseService.setUserExercise(currentUser?.uid as string, exercise).then(() => {
        this.toastr.success('The exercise was added');
      }).catch((error) => {
        this.toastr.error('Something went wrong');
        console.log(error);
      })
    } else {
      alert('Please sign in to your account or create one');
    }
  }

}
