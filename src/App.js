import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {input,inputCleaner} from './actions/inputUpdateAction';
import {loadTasks,addTask} from './actions/tasksAction';

import Config from '../src/config/config';

import ToDoList from './Components/ToDoList/ToDoList';
import './App.css';

// const servPORT = process.env.PORT || 'http://localhost:3001';

class App extends Component {

    componentDidMount(){
        axios.get(`http://localhost:${Config.server_port}/tasks`).then(({data,status})=>{if(status === 200){this.props.loadTasksFunc(data)}});
    }

    addInput = (event) => {
        event.preventDefault();
        let newInput = this.props.input;
        axios.post('http://localhost:3001/tasks',{task: newInput})
            .then(({data, status}) => {
                if (status === 201) {
                    this.props.addInputFunc(data);
                }
            });
    };

    inputHandler =(event)=>{
            this.addInput(event); this.props.inputCleaner();
    };

    render() {
        return (
            <div className='container'>
                <div className='container__form'>
                    <h1 className='header'>ToDo List</h1>
                    <form onSubmit={this.inputHandler}>
                        <input className='input' onChange={this.props.inputFunc} type="text" name='input' value={this.props.input} />
                        <button className='container__btn' type='submit'>Create</button>
                    </form>
                </div>
                <ToDoList />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        input: state.input,
        inputsArr: state.inputsArr
    }
}

function mapDispatchToProps (dispatch) {
    return {
        inputFunc: function({target}) {
            dispatch(input(target.value))
        },
        addInputFunc: function(value) {
            dispatch(addTask(value))
        },
        inputCleaner:function() {
            dispatch(inputCleaner())
        },
        loadTasksFunc:function(data) {
            dispatch(loadTasks(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);

