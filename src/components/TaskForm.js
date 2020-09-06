import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            status: false
        };
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        // cancel & close form
        var { itemEditing } = this.props;
        if (itemEditing && itemEditing.id !== '') {
            this.props.onClearTask({
                id: '',
                name: '',
                status: false
            });
        }
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
    }

    componentDidMount() {
        if (this.props.itemEditing && this.props.itemEditing !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps && nextProps.itemEditing && nextProps.itemEditing.id !== prevState.id) {
            return {
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            };
        }
        else if (!nextProps.itemEditing && prevState.id !== '') {
            return {
                id: '',
                name: '',
                status: false,
            };
        }
        else return null;
    }

    // For old version. Now replace by function componentDidMount
    // componentWillMount() {
    //     if (this.props.itemEditing && this.props.itemEditing.id !== null) {
    //         this.setState({
    //             id: this.props.itemEditing.id,
    //             name: this.props.itemEditing.name,
    //             status: this.props.itemEditing.status
    //         });
    //     } else {
    //          this.onClear();
    //     }
    // }

    // For old version. Now replace by function getDerivedStateFromProps
    // Install: npx react-codemod rename-unsafe-lifecycles
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     // console.log(nextProps);
    //     // console.log(nextProps.itemEditing);
    //     if (nextProps && nextProps.itemEditing) {
    //         this.setState({
    //             id: nextProps.itemEditing.id,
    //             name: nextProps.itemEditing.name,
    //             status: nextProps.itemEditing.status,
    //         });
    //     } else if (!nextProps.itemEditing) {
    //         this.setState({
    //             id: "",
    //             name: "",
    //             status: false,
    //         });
    //     }
    // }

    render() {
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">

                    <h3 className="panel-title">
                        {this.state.id !== '' ? 'Edit task' : 'Add New Task'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>

                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Status: </label>
                        <select
                            name="status"
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                        <hr />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>
                            &nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                <span className="fa fa-close mr-5"></span>Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

TaskForm.propTypes = {

};

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);