import React from 'react';
import TaskSearch from './TaskSearch';
import TaskSort from './TaskSort';

class TaskControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className="row mt-15">
                <TaskSearch onSearch={this.props.onSearch} />
                <TaskSort
                    onSort={this.props.onSort}
                />
            </div>
        );
    }
}

TaskControl.propTypes = {

};

export default TaskControl;