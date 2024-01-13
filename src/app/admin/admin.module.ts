import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminExerciseComponent } from './admin-exercise/admin-exercise.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCoachComponent } from './admin-coach/admin-coach.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminComponent,
    AdminExerciseComponent,
    AdminCategoryComponent,
    AdminCoachComponent
  ]
})
export class AdminModule { }
