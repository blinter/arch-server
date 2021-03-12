import Task from "../model/Task";

class RemoveTaskEvent {
    taskToRemove?: Task;
    parentTask?: Task;

}

export default RemoveTaskEvent;