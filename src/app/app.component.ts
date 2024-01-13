import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserExerciseService } from './shared/services/user-exercise/user-exercise.service';
import { IUser } from './shared/interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'sfuture';

  private dailyCleanupInterval: any;
  public currentUserId!: any;

  constructor(
    private userExerciseService: UserExerciseService,
  ) {}

  ngOnInit(): void {
    // this.startDailyCleanup();
  }

  ngOnDestroy(): void {
    // this.stopDailyCleanup();
  }

  getPersonalData(): void {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUserId = currentUserString ? JSON.parse(currentUserString) : undefined;
  }

  startDailyCleanup(): void {
    const now = new Date();
    const cleanupTime = new Date(now);
    cleanupTime.setHours(0, 0, 0, 0);
  
    if (now >= cleanupTime) {
      cleanupTime.setDate(cleanupTime.getDate() + 1);
    }
  
    const timeUntilCleanup = cleanupTime.getTime() - now.getTime();
    
    this.dailyCleanupInterval = setInterval(() => {
      this.dailyCleanup();
    }, timeUntilCleanup);
  }

  stopDailyCleanup(): void {
    clearInterval(this.dailyCleanupInterval);
  }

  dailyCleanup(): void {
    console.log('Daily cleanup triggered at', new Date());
  
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();
      this.userExerciseService.getOneUser(this.currentUserId?.uid).subscribe(data => {
        const currentUserObject = data as IUser;
        
        const exercisesToDelete:any [] = [];
  
        currentUserObject.userExercises.forEach((exercise) =>{
          exercisesToDelete.push(exercise);
        });
        console.log(exercisesToDelete.length);
        if (exercisesToDelete.length >= 1) {
          exercisesToDelete.forEach(exercise => {
            this.userExerciseService.deleteUserExercise(this.currentUserId?.uid, exercise).then(response => {
              console.log('Exercise deleted successfully:', response);
              window.location.reload();
            }).catch(error => {
              console.error('Error deleting exercise:', error);
            });
          });
          
        }
      });
    }
  }
  
}
