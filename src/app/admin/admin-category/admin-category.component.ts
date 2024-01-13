import { Component } from '@angular/core';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category/category.service';
import { ImageService } from '../../shared/services/image/image.service';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.scss'
})
export class AdminCategoryComponent {

  public adminCategories: ICategoryResponse[] = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public isUploaded = false;
  public uploadPercent: number = 0;
  public isFormOpen = false;
  public currentCategoryId!: number | string;

  constructor(
    public categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,
  ) { 
  }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  toggleCategoryFormAndTable(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
    })
  }
  
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateCategory(this.categoryForm.value, this.currentCategoryId as string).then(() => {
        this.loadCategories();
        this.isFormOpen = false;
      })
    } else {
      this.editStatus = false;
      this.categoryService.createCategory(this.categoryForm.value).then(() => {
        this.loadCategories();
        this.isFormOpen = false;
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
    });
    this.isFormOpen = true;
    this.editStatus = true;
    this.currentCategoryId = category.id as string;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteCategory(category.id as string).then(() => {
      this.loadCategories();
    })
  }

}
