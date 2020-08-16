import React from 'react';
class TaskSort extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                    >
                        Sort <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li>
                            <a href="/#" role="button" className="sort_selected">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Name A-Z
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="/#" role="button">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Name Z-A
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li>
                            <a href="/#" role="button">
                                Status: Active
                            </a>
                        </li>
                        <li>
                            <a href="/#" role="button">
                                Status: Inactive
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

TaskSort.propTypes = {

};

export default TaskSort;