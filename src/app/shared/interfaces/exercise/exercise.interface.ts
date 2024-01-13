import { ICategoryRequest } from "../category/category.interface";

export interface IExerciseRequest {
    category: ICategoryRequest,
    name: string;
    path: string;
    description: string;
    duration: string;
    count: number;
    imagePath: string;
    gifImagePath: string;
    completed: boolean;
    date: string;
}

export interface IExerciseResponse extends IExerciseRequest {
    id: number | string;
}