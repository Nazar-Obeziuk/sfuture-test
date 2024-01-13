import { Component, OnInit } from '@angular/core';
import { ICoachResponse } from '../../shared/interfaces/coach/coach.interface';
import { CoachService } from '../../shared/services/coach/coach.service';
import { UserCoachService } from '../../shared/services/user-coach/user-coach.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../shared/interfaces/user/user.interface';

@Component({
  selector: 'app-coacher',
  standalone: true,
  imports: [],
  templateUrl: './coacher.component.html',
  styleUrl: './coacher.component.scss'
})
export class CoacherComponent implements OnInit {

  public userCoaches: ICoachResponse[] = [];
  public currentUserId!: any;
  public isUserCoachAdded = false;

  constructor(
    private coachService: CoachService,
    private userCoachService: UserCoachService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserCoaches();
    this.checkUserCoach();
  }

  getPersonalData(): void {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUserId = currentUserString ? JSON.parse(currentUserString) : undefined;
  }

  getUserCoaches(): void {
    this.coachService.getAllCoaches().subscribe(data => {
      this.userCoaches = data as ICoachResponse[];
    })
  }

  checkUserCoach(): void {
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();
      this.userCoachService.getOneUser(this.currentUserId.uid).subscribe(data => {
        const currentUserData = data as IUser;
        if (currentUserData.coaches.length === 1) {
          this.isUserCoachAdded = true;
        } else {
          this.isUserCoachAdded = false;
        }
      });
    } 
  }

  addCoach(coach: ICoachResponse): void {
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();

      // this.checkUserCoach().pipe(
      //   tap(res => {
      //     if (!res) this.toastr.error('You already have a coach');
      //   }),
      //   filter(res => res),
      //   switchMap(() => this.userCoachService.setUserCoach(this.currentUserId.uid, coach)),
      //   tap(() => {
      //     this.toastr.success('Coach successfully added');
      //   }),
      //   catchError((error) => {
      //     this.toastr.error('Error backend');
      //     console.log(error);
      //     return EMPTY;
      //   })
      // ).subscribe();

      this.userCoachService.setUserCoach(this.currentUserId.uid, coach).then(() => {
        this.toastr.success('Coach successfully added');
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert('Please sign in to your account or create one');
    }
  }

}
