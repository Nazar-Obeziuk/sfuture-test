export interface ICoachRequest {
    name: string;
    status: string;
    imagePath: string;
    description: string;
}

export interface ICoachResponse extends ICoachRequest {
    id: string;
}