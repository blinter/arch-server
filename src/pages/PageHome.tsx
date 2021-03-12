import React, { ComponentProps, Props } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Task from '../model/Task';
import ReactKeyGen from '../utils/ReactKeyGen';

class PageHome extends React.Component {

    state = {
        tasks: []
    }

    componentDidMount() {
        //TODO:Configure axios base URL in a global scope.
        axios.get(`http://localhost:8080/task`)
            .then(res => {
                this.setState({ tasks: res.data })
            })
    }

    render() {
        return (
            <div>
                <h1>PAGE HOME</h1>

                <h2>Listas:</h2>private

                {this.state.tasks.map((task: Task) => {
                    return (<div key={ReactKeyGen.generateKey()}>
                        <Link to={`/task/id/${task.id}`}>
                            <h4>{task.description}</h4>
                        </Link>
                    </div>)
                })}

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

export default PageHome;