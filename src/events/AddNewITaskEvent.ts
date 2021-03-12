import Task from "../model/Task";

class AddNewITaskEvent {
    task: Task;
    parent: Task;
    constructor(task: Task, parent: Task) {
        this.task = task;
        this.parent = parent;
    }
}

export default AddNewITaskEvent;