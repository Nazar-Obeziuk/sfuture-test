import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise.component';
import { ExerciseInfoComponent } from './exercise-info/exercise-info.component';

const routes: Routes = [
    { path: '', component: ExerciseComponent },
    { path: ':id', component: ExerciseInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }