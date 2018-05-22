import Task from './Task.model';

class TasksManager{
    constructor(){
        this.tasks = [
            new Task(1, 'homework', 'easy'),
            new Task(2, 'decorate house', 'hard'),
            new Task(3, 'code java', 'intermediate'),
            new Task(4, 'go picnicking', 'intermediate'),
            new Task(5, 'make friend', 'hard'),
            new Task(6, 'earn money', 'easy'),
        ]
    }

    addtask(task){
        if(this.tasks.length  != 0){
            let max = this.tasks[0].id;
            this.tasks.forEach(task => {
                if(max < task.id) max = task.id;
            })

            task.id = max + 1;
        }else{
            task.id = 1;
        }
        this.tasks.push(task);
        return task;
    }

    removeTask(id){
        let index = this.tasks.findIndex(task => task.id == id);
        return this.tasks.splice(index, 1);
    }

    updateTask(newtask){
        let index = this.tasks.findIndex(task => task.id == newtask.id);
        this.tasks[index] = newtask;
        return newtask;
    }

    sortByName(val){
        if(val == 'name-ASC'){
            this.tasks.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        }else{
            this.tasks.sort((a, b) => b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1);
        }
        return this.tasks;
    }

    convertLevelToNumber(val){
        if(val.toLowerCase() == 'easy') return 0;
        if(val.toLowerCase() == 'intermediate') return 1;
        if(val.toLowerCase() == 'hard') return 2;
    }

    sortByLevel(val){
        if(val == 'level-ASC'){
            this.tasks.sort((a, b) => this.convertLevelToNumber(a.level) - this.convertLevelToNumber(b.level));
        }else{
            this.tasks.sort((a, b) => this.convertLevelToNumber(b.level) - this.convertLevelToNumber(a.level));
        }
        return this.tasks;
    }

    findByName(name){
        return this.tasks.filter(task => task.name.toLowerCase().indexOf(name) > -1);
    }
}

export default TasksManager 