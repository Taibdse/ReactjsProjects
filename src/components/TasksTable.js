import React, { Component } from 'react';
import TaskElement from './Task';


class TasksTable extends Component {
    constructor(props){
      super(props);
    }
  
    update = (task) => {
      this.props.onUpdate(task);
    }
  
    delete = (id) => {
      this.props.onDelete(id);
    }
  
    render() {
  
      let taskList = this.props.taskList.map((task, index) => {
       return <TaskElement 
          task = {task} 
          key = {task.id}  
          onDelete = {this.delete} 
          onUpdate = {this.update} 
          index = {index + 1}
        />
      })
  
      return (
          <table className = "table table-hover table-striped">
            <thead>
              <tr>
                <td>#</td>
                <td>Task</td>
                <td>Level</td>
                <td>Action</td>
              </tr>
            </thead>
  
            <tbody>
              {taskList}
            </tbody>
          </table>
      );
    }
  }
  
  export default TasksTable;