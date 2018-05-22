class Task{
    constructor(id, name, level){
        this.id = id;
        this.name = name;
        this.level = level;
    }

    static getLevel(){
        return ['hard', 'intermediate', 'easy'];
    }

    showTaskName(){
        return this.name.toLowerCase().trim().split(/\s+/).map(word => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(' ');
    }
}

export default Task