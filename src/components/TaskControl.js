import React from 'react';
import TaskSearch from './TaskSearch';
import TaskSort from './TaskSort';

class TaskControl extends React.Component {
    render() {
        return (
            <div className="row mt-15">
                <TaskSearch />
                <TaskSort />
            </div>
        );
    }
}

export default TaskControl;