import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends React.Component {
    showStatusElement() {
        return (
            <span
                className={this.props.task.status === true ? 'label label-danger' : 'label label-success'}
                onClick={this.onUpdateStatus}
            >
                {this.props.task.status === true ? 'Active' : 'InActive'}
            </span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onOpenForm(); // dispatch(actions.openForm)
        this.props.onEditTask(this.props.task);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    {this.showStatusElement()}
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onEditTask}
                    >
                        <span className="fa fa-pencil mr-5"></span>Edit
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDeleteItem}
                    >
                        <span className="fa fa-pencil mr-5"></span>Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);