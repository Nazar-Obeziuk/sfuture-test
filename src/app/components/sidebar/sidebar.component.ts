import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user/user.interface';
import { SidebarService } from '../../shared/services/sidebar/sidebar.service';
import { PlanService } from '../../shared/services/plan/plan.service';
import { IPlan } from '../../shared/interfaces/plan/plan.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  public currentMonthEvents: IPlan[] = [];
  private currentDate = new Date();
  public currentMonth = this.currentDate.getMonth() + 1;
  public currentYear = this.currentDate.getFullYear();
  public currentUserId!: any;
  public isClickedBurger = false;

  constructor(
    public sidebarService: SidebarService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this.getAllCurrentMonthEvents();
      // if (localStorage.getItem('currentUser')) {
      //   console.log('works');
      // } else {
      //   console.log('not works')
      // }
  }

  getPersonalData(): void {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUserId = currentUserString ? JSON.parse(currentUserString) : undefined;
  }

  getAllCurrentMonthEvents(): void {
    if (localStorage.getItem('currentUser')) {
      this.getPersonalData();
      this.planService.getUser(this.currentUserId.uid).subscribe(data => {
        const currentUserData = data as IUser;
        
        this.currentMonthEvents = currentUserData.planEvents.filter((event) => {
          return event.month === this.currentMonth && event.year === this.currentYear
        });
      });
    }
  }

  showMenu(): void {
    this.isClickedBurger = !this.isClickedBurger;
  }

  hideMenu(): void {
    this.isClickedBurger = !this.isClickedBurger;
  }

}
