export interface IUser {
    firstName: string;
    lastName: string;
    height: string;
    weight: string;
    age: string;
    email: string;
    password: string;
    confirmationPassword?: string;
    planEvents: Array<any>;
    userExercises: Array<any>;
    sheduleWeeks: Array<any>;
    coaches: Array<any>;
    role: string;
}