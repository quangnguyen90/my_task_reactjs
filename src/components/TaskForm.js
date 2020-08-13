import React from 'react';
class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.task !== null ? this.props.task.id : '',
            name: this.props.task !== null ? this.props.task.name : '',
            status: this.props.task !== null ? this.props.task.status : false
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

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        // cancel & close form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        })
    }

    componentDidMount() {
        if (this.props.task && this.props.task !== null) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.task && nextProps.task.id !== prevState.id) {
            return {
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            };
        }
        else return null;
    }

    // For old version. Now replace by function getDerivedStateFromProps
    // Install: npx react-codemod rename-unsafe-lifecycles
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     // console.log(nextProps);
    //     // console.log(nextProps.task);
    //     if (nextProps && nextProps.task) {
    //         this.setState({
    //             id: nextProps.task.id,
    //             name: nextProps.task.name,
    //             status: nextProps.task.status,
    //         });
    //     } else if (!nextProps.task) {
    //         this.setState({
    //             id: "",
    //             name: "",
    //             status: false,
    //         });
    //     }
    // }


    render() {
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">

                    <h3 className="panel-title">
                        { id !== '' ? 'Edit task' : 'Add New Task'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>

                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
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

export default TaskForm;