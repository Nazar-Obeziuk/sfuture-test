export interface ICategory {
    id: number;
    name: string;
}

export interface ICategoryRequest {
    name: string;
}

export interface ICategoryResponse extends ICategoryRequest {
    id: number | string;
}