import {ITodo} from "./ITodo";

export interface IProject {
    id:string,
    userId: string,
    projectName: string,
    todosList: ITodo[]
}
