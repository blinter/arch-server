import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import RemoveTaskEvent from '../events/RemoveTaskEvent';
import Task from '../model/Task';
import Emitter from '../utils/Emitter';
import ReactKeyGen from '../utils/ReactKeyGen';

type ComponentProps = {
    hierarchicalLevel: number;
    task?: Task;
    parent?: Task;
};

class TaskComponent extends React.Component<ComponentProps> {

    addNewItem() {
        console.log('TaskComponent.addNewItem', this.props)
        Emitter.emit('ADD_NEW_ITEM', {
            parent: this.props.task,
            task: {
                key: ReactKeyGen.generateKey(),
                description: 'Item description'
            }
        })
    }

    removeItem() {
        console.log('TaskComponent.removeItem', this.props)
        Emitter.emit('REMOVE_ITEM', { parentTask: this.props.parent, taskToRemove: this.props.task })
    }

    render() {
        return (
            <div className='container'>
                {this.props.task?.key}
                <div className='row'>
                    <div className='form-group pt-2'>
                        <label>Descrição da Tarefa</label>
                        <input className='form-control' value={this.props.task?.description} onChange={(evt) => {
                            console.log('TaskComponent.onItemDescriptionChange')
                            //let newVersion: Task = JSON.parse(JSON.stringify(this.props.task));
                            //newVersion.description = evt.target.value;
                            Emitter.emit('ITEM_DESCRIPTION_CHANGE', Object.assign({}, this.props.task, { description: evt.target.value }));
                        }} placeholder='Descrição' />
                    </div>
                    <div>
                        <button onClick={() => { this.removeItem() }}>Remover item</button>
                        <button className='btn btn-sm' onClick={() => { this.addNewItem() }}>Adicionar item</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {(this.props.task?.tasks ?? []).map((t) => {
                            return <div key={ReactKeyGen.generateKey()}>
                                <TaskComponent hierarchicalLevel={this.props.hierarchicalLevel + 1} parent={this.props.task} task={t} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
};

export default TaskComponent;