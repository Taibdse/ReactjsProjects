import React, { Component } from 'react';
import './App.css';

import Task from '../models/Task.model';
import TasksManager from '../models/TasksManager.model';


import TaskElement from './Task';
import TasksTable from './TasksTable';
import Controls from './Controls';

class App extends Component {
  constructor(props){
    super(props);
    this.taskManager = new TasksManager();
    this.state = {
      taskList: this.taskManager.sortByName('name-ASC'),
      currentTask:{},
      isShowForm: false
    }
  }

  delete = async (id) => {
    let sure = window.confirm('Are you sure');
    if(sure){
      await this.taskManager.removeTask(id);
      this.setState({taskList: this.taskManager.tasks, currentTask: {}});
    }
    this.setState({isShowForm: false});
  }

  update = (task) => {
    this.setState({currentTask: task, isShowForm: true});
  }

  save = (task) => {
    if(!task.id) {
      this.taskManager.addtask(task);
      this.setState({taskList: this.taskManager.tasks});
    }
    else {
      this.taskManager.updateTask(task);
      this.setState({taskList: this.taskManager.tasks});
    }
    this.setState({currentTask: {}});
  }

  sortBy = (val) => {
    if(val.indexOf('name') > -1) this.setState({taskList: this.taskManager.sortByName()});
    else this.setState({taskList: this.taskManager.sortByLevel(val)});
  }

  findName = (val) => {
    if(val.trim() == '') this.setState({taskList: this.taskManager.tasks});
    else this.setState({taskList: this.taskManager.findByName(val)});
  }

  cancel = () => {
    this.setState({currentTask: {}, isShowForm: false});
  }

  render() {
    return (
      <div className = "container">
        <section className = "controls">
          <Controls
            onAddAndUpdate = {this.save}
            currentTask = {this.state.currentTask}
            onChange = {this.sortBy}
            onHandleFindName = {this.findName}
            cancel = {this.cancel}
            isShowForm = {this.state.isShowForm}
          />
        </section>

        <section className = "data">
          <div className = "card">
            <div className = "card-header">List Task</div>
            <div className = "card-body">
              <TasksTable  
                taskList = {this.state.taskList}
                onUpdate = {this.update}
                onDelete = {this.delete}                
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
