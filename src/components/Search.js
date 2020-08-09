import React from 'react';
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        type="text"
                        name="keyword"
                        className="form-control"
                        placeholder="Enter keyword..."
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button">
                            <span className="fa fa-search mr-5"></span>Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

Search.propTypes = {

};

export default Search;