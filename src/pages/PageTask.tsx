import axios from 'axios';
import { EventSubscription } from 'fbemitter';
import React from 'react';
import { Link } from 'react-router-dom';
import underscode from 'underscore';
import TaskComponent from '../components/TaskComponent';
import AddNewITaskEvent from '../events/AddNewITaskEvent';
import RemoveTaskEvent from '../events/RemoveTaskEvent';
import Task from '../model/Task';
import Emitter from '../utils/Emitter';
import ReactKeyGen from '../utils/ReactKeyGen';

interface Props { };

interface State {
    rootTask?: Task;
    listeners: EventSubscription[],
    showDeleteConfirmation?: Boolean
};

class PageTask extends React.Component<any, State> {

    constructor(props: Props) {
        super(props)

        let state: State = { listeners: [] };

        state.rootTask = { description: "Sua tarefa", key: ReactKeyGen.generateKey() };
        state.listeners = [];
        state.showDeleteConfirmation = false;

        this.state = state;

    };

    componentDidMount() {

        let listeners = [
            Emitter.addListener('ITEM_DESCRIPTION_CHANGE', this.itemDescriptionChange.bind(this)),
            Emitter.addListener('ADD_NEW_ITEM', this.addNewitem.bind(this)),
            Emitter.addListener('REMOVE_ITEM', this.findAndRemove.bind(this))
        ]

        this.setState({ listeners });

        if (this.props.match.params.id) {
            //TODO: Use a global sufix in axios .
            axios.get(`http://localhost:8080/task/${this.props.match.params.id}`)
                .then(res => {
                    this.setState({ rootTask: res.data })
                });
        }

    };

    componentWillUnmount() {
        console.log('PageTask.componentWillUnmount')
        //Remove all listenners for this component.
        for (const token of this.state.listeners) {
            token.remove()
        }
    };

    //Add a new item to a task.
    addNewitem(e: AddNewITaskEvent) {

        console.log('PageTask.addNewItem', e)

        //clone the current root task
        let newRootItem: Task | null | undefined = underscode.clone(this.state.rootTask);//Just deep cloning

        //try to find the parent task for the task who emited the event.
        let parent: Task | null | undefined;

        if (!e.parent) {
            parent = newRootItem
        } else {
            parent = this.findItem(newRootItem, e.parent.key)
        }

        if (parent) {
            parent.tasks = parent.tasks || []
            parent.tasks.unshift(e.task)
            this.setState({ rootTask: newRootItem })
        }

    }

    findItem(task?: Task, key?: string): Task | null {

        if (!task) return null;

        if (task.key === key) return task

        if (task.tasks) {
            for (const i of task.tasks) {
                if (key === i.key) {
                    return i
                }
                if (key != i.key && (i.tasks && i.tasks.length > 0)) {
                    return this.findItem(i, key)
                }
            }
        }
        return null
    }

    itemDescriptionChange(task: Task) {
        let newRootItem = underscode.clone(this.state.rootTask);
        let findedItem = this.findItem(newRootItem, task.key)
        if (findedItem)
            findedItem.description = task.description
        this.setState({ rootTask: newRootItem })
    }

    //Removes a item from three.
    findAndRemove(e: RemoveTaskEvent) {

        if (e.parentTask && e.taskToRemove != undefined) {
            e.parentTask.tasks = e.parentTask.tasks?.filter((t) => { e.taskToRemove && t.key != e.taskToRemove.key })
            let newRootItem: Task = JSON.parse(JSON.stringify(this.state.rootTask));//Just deep cloning
            this.setState({ rootTask: newRootItem })
        }
    }

    render() {
        return (
            <div>
                <h1>PAGE HOME</h1>

                <TaskComponent hierarchicalLevel={1} task={this.state.rootTask} />

                <button
                    onClick={() => {
                        this.setState({ showDeleteConfirmation: true })
                        axios.post('http://localhost:8080/task', this.state.rootTask)
                            .then((res) => {
                                this.setState({ rootTask: res.data })
                            })
                    }}>Salvar</button>

                <h2>Listas:</h2>

                <div className='row mt-5'>
                    <div className='col text-center' >
                        <Link to="/task/"  >
                            <button>Criar lista</button>
                        </Link>
                    </div>
                </div>
            </div>

        )
    }
};

export default PageTask;

