import React, { Component } from 'react';
import Task from '../models/Task.model';


class Controls extends Component {
    constructor(props){
      super(props);
      this.state = {
        currentTask: this.props.currentTask,
        isShowForm: this.props.isShowForm
      }
    }
  
    componentWillReceiveProps(props){
      this.setState({currentTask: props.currentTask, isShowForm: props.isShowForm});
    }

    componentDidMount(){
      this.refs.sortBy.textContent = 'name-ASC'
    }
  
    showForm = () => {
     this.setState({isShowForm: true, currentTask: {name: '', level: ''}});
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      let name = this.refs.taskNameInput.value;
      let level = this.refs.levelSelect.value;
      let id = this.state.currentTask.id;
        
      if(name != '' && level != ''){
        let task = new Task(id, name, level);
        this.props.onAddAndUpdate(task);
        this.setState({isShowForm: false});
      }else{
        alert('Please fill in name and select level');
      }
    }
  
    changeValue = (e) => {
      let currentTask = this.state.currentTask;
      currentTask[e.target.name] = e.target.value;
      this.setState({currentTask: currentTask});
    }
  
    handleFindname = (e) => {
      this.props.onHandleFindName(e.target.value);
    }
  
    handleOnchange = (e) => {
      this.refs.sortBy.textContent = e.target.value
      this.props.onChange(e.target.value);
    }
  
    cancel =  () => {
      this.props.cancel();
    }
  
    render() {
  
      let levelEle = Task.getLevel().map(level => {
        return <option value = {level}>{level}</option>
      }) 
  
      let name  = this.state.currentTask.name;
      let level  = this.state.currentTask.level;
      
      if(!name) name = '';
      if(!level) level = '';
      
      return (
        <div className = "row my-4">
          <div className = "col-sm-4">
            <input type = "text" className = "form-control" placeholder = "Enter task..." onChange = {this.handleFindname}/>
          </div>
          <div className = "col-sm-4">
            <div className = "form-group">
              <select className = "form-control sort-by-select" onChange = {this.handleOnchange}>
                <option value = "name-ASC">Name - ASC</option>
                <option value = "name-DES">Name - DSC</option>
                <option value = "level-ASC">Level - ASC</option>
                <option value = "level-DES">Level - DSC</option>
              </select>
            </div>
            <span className = "sort-by alert alert-success" ref = "sortBy"></span>
          </div>
          <div className = "col-sm-4">
          {!this.state.isShowForm && 
            (<button className = "btn-block btn-info" onClick = {this.showForm}>Add Task</button>)
          }
            <form className = "my-4 form" ref = "form" onSubmit = {this.handleSubmit} style = { this.state.isShowForm ? {display: 'block'} : {display: 'none'}}>
              <div className = "row">
                <div className = "col-md-5">
                  <div className = "form-group">
                    <label>Task name</label>
                    <input type = "text" placeholder = "Enter task name..." ref = "taskNameInput" name = "name" value = {name} onChange = {this.changeValue}/>
                  </div>
                </div>
                <div className = "col-md-2"></div>
                <div className = "col-md-5">
                  <div className = "form-group">
                    <label>Level</label>
                    <select className = "form-control" ref = "levelSelect" name = "level" value = {level} onChange = {this.changeValue}>
                      {levelEle}
                    </select>
                  </div>
                </div>
              </div>
              <button className = "btn btn-success" type = "submit">Save</button>
              <button className = "btn btn-dark" type = "button" onClick = {this.cancel}>Cancel</button>
            </form>
          </div>
        </div>
      );
    }
  }

export default Controls;