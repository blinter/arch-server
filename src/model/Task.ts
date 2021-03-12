class Task {
    key: string;
    id?: string;
    description?: string;
    tasks?: Task[] = [];

    constructor(key:string){
        this.key = key
    }
}

export default Task;