import React, { Component } from 'react';

class TaskElement extends Component {
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
  
      let task = this.props.task;
      let eleLevel = '';
      
      switch(task.level){
        case 'hard':
          eleLevel = <span className = "badge badge-danger">{ task.level }</span>
          break;
        case 'easy':
          eleLevel = <span className = "badge badge-info">{ task.level }</span>
          break;
        case 'intermediate':
          eleLevel = <span className = "badge badge-secondary">{ task.level }</span>
          break;
      }
      return (
        <tr>
          <td>{ this.props.index }</td>
          <td>{ task.showTaskName() }</td>
          <td>{ eleLevel }</td>
          <td>
            <button className = "btn btn-info" onClick = {() => {this.update(task)}}>Edit</button>
            <button className = "btn btn-danger" onClick = {() => {this.delete(task.id)}}>Delete</button>
          </td>
        </tr>
      );
    }
  }

  export default TaskElement;