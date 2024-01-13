import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '../../shared/pipes/slice/slice.pipe';
import { RouterLink } from '@angular/router';
import { IExerciseResponse } from '../../shared/interfaces/exercise/exercise.interface';
import { UserExerciseService } from '../../shared/services/user-exercise/user-exercise.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../shared/interfaces/user/user.interface';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [SlicePipe, RouterLink],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent implements OnInit {

  public userExerciseList: IExerciseResponse[] = [];
  public userCompletedExerciseList: IExerciseResponse[] = [];
  public isCompletedExercise = false;
  public todaysDate!: string;
  public currentUserId!: any;
  public currentUser!: any;
  // private dailyCleanupInterval: any;

  constructor(
    private userExerciseService: UserExerciseService,
    private toastr: ToastrService
  ) {
    const currentDate = new Date();
    const today = new Date(currentDate);
    today.setDate(currentDate.getDate());
    this.todaysDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    // this.startDailyCleanup();
  }
  
  ngOnInit(): void {
    this.getUserExercises();
    this.getUserCompletedExercises();
  }

  // ngOnDestroy(): void {
  //   this.stopDailyCleanup();
  // }

  // startDailyCleanup(): void {
  //   const now = new Date();
  //   const cleanupTime = new Date(now);
  //   // cleanupTime.setHours(0, 0, 0, 0);
  //   cleanupTime.setHours(13, 31, 0, 0);
  
  //   if (now >= cleanupTime) {
  //     cleanupTime.setDate(cleanupTime.getDate() + 1);
  //   }
  
  //   const timeUntilCleanup = cleanupTime.getTime() - now.getTime();
  //   console.log(timeUntilCleanup);
    
  //   this.dailyCleanupInterval = setInterval(() => {
  //     this.dailyCleanup();
  //   }, timeUntilCleanup);
  // }

  // stopDailyCleanup(): void {
  //   clearInterval(this.dailyCleanupInterval);
  // }

  // dailyCleanup(): void {
  //   console.log('Daily cleanup triggered at', new Date());
  
  //   if (localStorage.getItem('currentUser')) {
  //     this.getPersonalData();
  //     this.userExerciseService.getOneUser(this.currentUserId?.uid).subscribe(data => {
  //       const currentUserObject = data as IUser;
        
  //       const exercisesToDelete:any [] = [];
  
  //       currentUserObject.userExercises.forEach((exercise) =>{
  //         exercisesToDelete.push(exercise);
  //       });
  //       console.log(exercisesToDelete.length);
  //       if (exercisesToDelete.length >= 1) {
  //         exercisesToDelete.forEach(exercise => {
  //           this.userExerciseService.deleteUserExercise(this.currentUserId?.uid, exercise).then(response => {
  //             console.log('Exercise deleted successfully:', response);
  //             window.location.reload();
  //           }).catch(error => {
  //             console.error('Error deleting exercise:', error);
  //           });
  //         });
          
  //         this.getUserExercises();
  //         this.getUserCompletedExercises();
  //       }
  //     });
  //   }
  // }
  

  getPersonalData(): void {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUserId = currentUserString ? JSON.parse(currentUserString) : undefined;
  }
  
  getUserExercises(): void {
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();
      this.userExerciseService.getOneUser(this.currentUserId?.uid).subscribe(data => {
        const currentUserObject = data as IUser;
        this.userExerciseList = currentUserObject.userExercises.filter((exercise) => exercise.completed === false);
      });
    }
  }

  getUserCompletedExercises(): void {
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();
      this.userExerciseService.getOneUser(this.currentUserId?.uid).subscribe(data => {
        const currentUserObject = data as IUser;
        this.userCompletedExerciseList = currentUserObject.userExercises.filter((exercise) => exercise.completed === true);
      });
    }
  }

  deleteUserExercise(userExercise: IExerciseResponse): void {
    this.getPersonalData();
    this.userExerciseService.deleteUserExercise(this.currentUserId?.uid, userExercise).then(() => {
      this.getUserExercises();
      this.toastr.success('The exercise was successfully deleted');
    }).catch((error) => {
      this.toastr.error('Something went wrong');
      console.log(error);
    })
  }

  toggleProcessExercises(): void {
    this.isCompletedExercise = false;
  }

  toggleCompletedExercises(): void {
    this.isCompletedExercise = true;
  }

}
