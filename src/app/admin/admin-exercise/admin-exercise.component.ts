import { Component, OnInit } from '@angular/core';
import { IExerciseResponse } from '../../shared/interfaces/exercise/exercise.interface';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category/category.service';
import { ExerciseService } from '../../shared/services/exercise/exercise.service';
import { ImageService } from '../../shared/services/image/image.service';
import { SlicePipe } from '../../shared/pipes/slice/slice.pipe';

@Component({
  selector: 'app-admin-exercise',
  standalone: true,
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './admin-exercise.component.html',
  styleUrl: './admin-exercise.component.scss'
})
export class AdminExerciseComponent implements OnInit {

  public adminCategories: ICategoryResponse[] = [];
  public adminExercises: IExerciseResponse[] = [];
  public exerciseForm!: FormGroup;
  public isUploadedImage = false;
  public isUploadedGifImage = false;
  public isFormOpen = false;
  public editStatus = false;
  public currentCategoryId!: number | string;
  public todaysDate!: string;

  constructor(
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
    private imageService: ImageService,
    private fb: FormBuilder
  ) {
    const currentDate = new Date();
    const today = new Date(currentDate);
    today.setDate(currentDate.getDate());
    this.todaysDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  ngOnInit(): void {
    this.initExerciseForm();
    this.loadCategories();
    this.loadExercises();
  }
  
  initExerciseForm(): void {
    this.exerciseForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      duration: [null, Validators.required],
      count: [null, Validators.required],
      imagePath: [null, Validators.required],
      gifImagePath: [null, Validators.required],
      completed: false,
      date: this.todaysDate,
    })
  }
  
  toggleExerciseFormAndTable(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
      this.exerciseForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(data => {
      this.adminExercises = data as IExerciseResponse[];
    })
  }
  
  addExercise(): void {
    if (this.editStatus) {
      this.exerciseService.updateExercise(this.exerciseForm.value, this.currentCategoryId as string).then(() => {
        this.loadExercises();
        this.editStatus = false;
        this.isFormOpen = false;
      })
    } else {
      this.exerciseService.createExercise(this.exerciseForm.value).then(() => {
        this.loadExercises();
        this.exerciseForm.reset();
        this.editStatus = false;
        this.isFormOpen = false;
        this.isUploadedImage = false;
        this.isUploadedGifImage = false;
      })
    }
  }

  editExercise(exercise: IExerciseResponse): void {
    this.exerciseForm.patchValue({
      category: exercise.category,
      name: exercise.name,
      path: exercise.path,
      description: exercise.description,
      duration: exercise.duration,
      count: exercise.count,
      imagePath: exercise.imagePath,
      gifImagePath: exercise.gifImagePath
    });
    this.editStatus = true;
    this.isFormOpen = true;
    this.isUploadedImage = true;
    this.isUploadedGifImage = true;
    this.currentCategoryId = exercise.id;
  }

  deleteExercise(exercise: IExerciseResponse): void {
    this.exerciseService.deleteExercise(exercise.id as string).then(() => {
      this.loadExercises();
    })
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.exerciseForm.patchValue({
          imagePath: data,
        })
        this.isUploadedImage = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  uploadGifImage(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.exerciseForm.patchValue({
          gifImagePath: data
        })
        this.isUploadedGifImage = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploadedImage = false;
        this.exerciseForm.patchValue({
          imagePath: null
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteGifImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('gifImagePath'))
      .then(() => {
        this.isUploadedGifImage = false;
        this.exerciseForm.patchValue({
          gifImagePath: null
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.exerciseForm.get(control)?.value;
  }

}
