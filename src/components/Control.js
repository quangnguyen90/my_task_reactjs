import React from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className="row mt-15">
                <Search />
                <Sort />
            </div>
        );
    }
}

Control.propTypes = {

};

export default Control;