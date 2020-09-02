import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
// C1: Import all
//import _ from 'lodash';
// C2: Import filtered function
import { findIndex, filter as filterSearch } from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
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
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateRandomString()
      tasks.push(data);
    } else {
      // Editing
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    // C1: Manual
    // var index = this.findIndex(id);

    // C2: Using Lodash lib (import all)
    // var index = _.findIndex(tasks, function (task) {
    //   return task.id === id;
    // });

    // C3: Using only function findIndex from lodash
    var index = findIndex(tasks, function (task) {
      return task.id === id;
    });

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

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();

  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLocaleLowerCase()
    })
  }

  onSort = (sort) => {
    this.setState({
      sort: sort,
    });
  }

  render() {
    var {
      tasks,
      isDisplayForm,
      taskEditing,
      filter,
      keyword,
      sort
    } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      });
    }

    if (keyword) {
      // C1: Manual
      // tasks = tasks.filter((task) => {
      //   return task.name.toLowerCase().indexOf(keyword) !== -1;
      // });

      // C2: Using Lodash Lib - Import all
      // tasks = _.filter(tasks, function (task) {
      //   return task.name.toLowerCase().indexOf(keyword) !== -1
      // });

      // C3: Using only function filter from lodash
      tasks = filterSearch(tasks, function (task) {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      });
    }

    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value; // ASC
        else if (a.name < b.name) return -sort.value; // DESC
        else return 0; // Default
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0; // Default
      });
    }

    var elmTaskForm = isDisplayForm
      ? <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
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
            <TaskControl
              onSearch={this.onSearch}
              onSort={this.onSort}
            />
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
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
