import { Component, OnInit } from '@angular/core';
import { UserExerciseService } from '../../shared/services/user-exercise/user-exercise.service';
import { SlicePipe } from '../../shared/pipes/slice/slice.pipe';
import { NgClass } from '@angular/common';
import { IDayData } from '../../shared/interfaces/scheduler-date/scheduler-date.interface';
import { SchedulerService } from '../../shared/services/scheduler/scheduler.service';
import { IExerciseResponse } from '../../shared/interfaces/exercise/exercise.interface';
import { IUser } from '../../shared/interfaces/user/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [SlicePipe, NgClass],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {

  public lengthOfAllUserExercises: IExerciseResponse[] = [];
  public percentCount = 0;
  public today = new Date();
  public currentUserId!: any;
  public startDate!: Date;
  public endDate!: Date;
  public weekInterval!: string;
  public daysOfWeek: { nameOfDay: string, date: string, percentCount: number }[] = [];
  
  constructor(
    private userExerciseService: UserExerciseService,
    private schedulerService: SchedulerService,
  ) {}
  
  ngOnInit(): void {
    this.getPersonalData();
    this.updateWeekRange();
    this.setTodaysDay();
    this.getPercentOfAcitivity();
    this.getWeekData();
  }

  getPersonalData(): void {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUserId = currentUserString ? JSON.parse(currentUserString) : undefined;
  }

  getStartAndEndOfWeek(): void {
    let startOfMonth = (this.startDate.getMonth() + 1).toString();
    let startOfDate = this.startDate.getDate().toString();
    let endOfMonth = (this.endDate.getMonth() + 1).toString();
    let endOfDate = this.endDate.getDate().toString();
  
    if (startOfDate.length === 1) startOfDate = '0' + startOfDate;
    if (endOfDate.length === 1) endOfDate = '0' + endOfDate;
    if (startOfMonth.length === 1) startOfMonth = '0' + startOfMonth;
    if (endOfMonth.length === 1) endOfMonth = '0' + endOfMonth;

    this.weekInterval = 
      `${startOfDate}.${startOfMonth}.${this.startDate.getFullYear()}`
      + ' - ' + `${endOfDate}.${endOfMonth}.${this.endDate.getFullYear()}`;
  }

  updateWeekRange() {
    const startOfWeek = new Date(this.today);
    startOfWeek.setDate(this.today.getDate() - this.today.getDay());
    const endOfWeek = new Date(this.today);
    endOfWeek.setDate(this.today.getDate() + (6 - this.today.getDay()));

    this.startDate = startOfWeek;
    this.endDate = endOfWeek;
    this.getStartAndEndOfWeek();
    this.generateDaysOfWeek();
  }
  
  setTodaysDay(): void {
    const todayFormattedDate = `${this.padZero(this.today.getDate())}.${this.padZero(this.today.getMonth() + 1)}.${this.today.getFullYear()}`;
    this.getPersonalData();
    if (localStorage.getItem('currentUser')) {
      this.userExerciseService.getOneUser(this.currentUserId.uid).subscribe(data => {
        const currentUserObject = data as IUser;
  
        this.daysOfWeek.forEach((day) => {
          const isDayInSchedule = currentUserObject.sheduleWeeks.some((sheduleDay) => this.isSameDate(day.date, sheduleDay.date));
          if (day.date === todayFormattedDate) {
            
            if (!isDayInSchedule) {
              this.schedulerService.setUserScheduleDay(this.currentUserId.uid, day as IDayData)
                .then(() => {})
                .catch((error) => console.log(error));
            }
          }
        });
      });
    }
  }

  isSameDate(date1: string, date2: string): boolean {
    return date1 === date2;
  }

  generateDaysOfWeek() {
    this.daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(this.startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
  
      const formattedDate = `${this.padZero(day)}.${this.padZero(month)}.${year}`;
      
      const dayOfWeek: IDayData = {
        id: uuidv4(),
        date: formattedDate,
        nameOfDay: this.getDayName(currentDate.getDay()),
        percentCount: 0,
      };

      this.daysOfWeek.push(dayOfWeek);
    }
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  getDayName(dayIndex: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }

  previousWeek() {
    this.startDate.setDate(this.startDate.getDate() - 7);
    this.endDate.setDate(this.endDate.getDate() - 7);
    this.getStartAndEndOfWeek();
    this.generateDaysOfWeek();
    this.getPercentOfAcitivity();
  }

  nextWeek() {
    this.startDate.setDate(this.startDate.getDate() + 7);
    this.endDate.setDate(this.endDate.getDate() + 7);
    this.getStartAndEndOfWeek();
    this.generateDaysOfWeek();
    this.getPercentOfAcitivity();
  }

  getPercentOfAcitivity(): void {
    const todayFormattedDate = `${this.padZero(this.today.getDate())}.${this.padZero(this.today.getMonth() + 1)}.${this.today.getFullYear()}`;

    this.getPersonalData();
    if (localStorage.getItem('currentUser')) {
      this.userExerciseService.getOneUser(this.currentUserId.uid).subscribe(data => {
        const currentUserObject = data as IUser;
       
        this.lengthOfAllUserExercises = currentUserObject.userExercises as IExerciseResponse[];
        const lengthOfCompletedExercises = this.lengthOfAllUserExercises.filter(exercise => exercise.completed === true);
        this.percentCount = (lengthOfCompletedExercises.length / this.lengthOfAllUserExercises.length) * 100;

        this.schedulerService.getOneUser(this.currentUserId.uid).subscribe(data => {
          const currentUserObject = data as IUser;
          
          currentUserObject.sheduleWeeks.forEach((sheduleDay) => {
            if (todayFormattedDate === sheduleDay.date) {
              sheduleDay.percentCount = this.percentCount;
              
              localStorage.setItem('currentSheduleDay', JSON.stringify(sheduleDay));
            }

            this.daysOfWeek.forEach((day) => {
              if (day.date === sheduleDay.date) {
                day.percentCount = sheduleDay.percentCount;
              }
            })
          });
        });
      });
    }

    const currentSheduleDayString = localStorage.getItem('currentSheduleDay');
    const currentSheduleDay = currentSheduleDayString ? JSON.parse(currentSheduleDayString) : undefined;

    if (currentSheduleDay.percentCount > 0) {
      this.schedulerService.updateUserScheduleDay(this.currentUserId.uid, currentSheduleDay.id, currentSheduleDay)
        .then(() => {})
        .catch((error) => console.log(error));
    }
    
  }

  getWeekData(): void {
    this.getPersonalData();
    if (localStorage.getItem('currentUser')) {
      this.schedulerService.getOneUser(this.currentUserId.uid).subscribe(data => {
        const currentUserObject = data as IUser;
  
        this.daysOfWeek.forEach((day) => {
          currentUserObject.sheduleWeeks.forEach((sheduleDay) =>{
            if (day.date === sheduleDay.date) {
              day.percentCount = sheduleDay.percentCount
            }
          })
        });
      })
    }
  }


}
