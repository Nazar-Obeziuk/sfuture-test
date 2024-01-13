import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageService } from '../../shared/services/image/image.service';
import { CoachService } from '../../shared/services/coach/coach.service';
import { ICoachResponse } from '../../shared/interfaces/coach/coach.interface';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-admin-coach',
  standalone: true,
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './admin-coach.component.html',
  styleUrl: './admin-coach.component.scss'
})
export class AdminCoachComponent implements OnInit {

  public adminCoaches: ICoachResponse[] = [];
  public coachForm!: FormGroup;
  public editStatus = false;
  public isUploaded = false;
  public uploadPercent: number = 0;
  public isFormOpen = false;
  public currentCoachId!: number | string;

  constructor(
    private coachService: CoachService,
    private imageService: ImageService,
    private fb: FormBuilder,
  ) { 
  }

  ngOnInit(): void {
    this.initCoachForm();
    this.loadCoaches();
  }

  toggleCategoryFormAndTable(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  initCoachForm(): void {
    this.coachForm = this.fb.group({
      name: [null, Validators.required],
      status: [null, Validators.required],
      imagePath: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  toggleCoachFormAndTable(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  loadCoaches(): void {
    this.coachService.getAllCoaches().subscribe(data => {
      this.adminCoaches = data as ICoachResponse[];
    })
  }

  addCoach(): void {
    if (this.editStatus) {
      this.coachService.updateCoach(this.coachForm.value, this.currentCoachId as string).then(() => {
        this.loadCoaches();
        this.isFormOpen = false;
      })
    } else {
      this.editStatus = false;
      this.coachService.createCoach(this.coachForm.value).then(() => {
        this.loadCoaches();
        this.isFormOpen = false;
      })
    }
    this.editStatus = false;
    this.coachForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editCoach(coach: ICoachResponse): void {
    this.coachForm.patchValue({
      name: coach.name,
      status: coach.status,
      imagePath: coach.imagePath,
      description: coach.description
    });
    this.isFormOpen = true;
    this.editStatus = true;
    this.currentCoachId = coach.id as string;
    this.isUploaded = true;
  }

  deleteCoach(coach: ICoachResponse): void {
    this.coachService.deleteCoach(coach.id as string).then(() => {
      this.loadCoaches();
    })
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.coachForm.patchValue({
          imagePath: data,
        })
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.coachForm.patchValue({
          imagePath: null
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.coachForm.get(control)?.value;
  }

}

