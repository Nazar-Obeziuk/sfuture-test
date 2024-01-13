import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { ExerciseInfoComponent } from './exercise-info/exercise-info.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    ExerciseComponent,
    ExerciseInfoComponent,
  ]
})
export class ExerciseModule { }
