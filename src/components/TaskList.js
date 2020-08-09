import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <th className="text-center">#</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
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
                    <TaskItem />
                </tbody>
            </table>
        );
    }
}

TaskList.propTypes = {

};

export default TaskList;