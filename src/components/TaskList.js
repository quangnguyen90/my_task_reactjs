import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        var { tasks } = this.props;
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
            />
        });
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" name="filterName" />
                        </td>
                        <td>
                            <select className="form-control" name="filterStatus">
                                <option value={-1}>All</option>
                                <option value={0}>Active</option>
                                <option value={1}>Inactive</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                </tbody>
            </table>
        );
    }
}

TaskList.propTypes = {

};

export default TaskList;