import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      isDisplayForm: false
    };

  }

  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateRandomString(),
        name: 'ReactJS',
        status: true
      },
      {
        id: this.generateRandomString(),
        name: 'Nodejs',
        status: false
      },
      {
        id: this.generateRandomString(),
        name: 'FullStack',
        status: true
      },
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  randomString() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateRandomString() {
    return this.randomString() + '-' + this.randomString()
      + '-' + this.randomString() + '-' + this.randomString()
      + '-' + this.randomString() + '-' + this.randomString()
      + '-' + this.randomString() + '-' + this.randomString();
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    data.id = this.generateRandomString()
    tasks.push(data);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  render() {
    var { tasks, isDisplayForm } = this.state;
    var elmTaskForm = isDisplayForm
      ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} />
      : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Management App</h1>
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {/* Form */}
            {elmTaskForm}
          </div>
          <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Add New Task
            </button>
            <button
              type="button"
              className="btn btn-danger m-5"
              onClick={this.onGenerateData}
            >
              <span className="fa fa-plus mr-5"></span>Generate Data
            </button>
            {/* Search - Sort */}
            <Control />
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
