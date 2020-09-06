import * as types from '../constants/ActionType'

var initialState = {
    name: '',
    status: -1
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            var filterName = action.filter.name;
            var filterStatus = parseInt(action.filter.status, 10);
            return {
                name: filterName.toLowerCase(),
                status: filterStatus
            };
        default: return state;
    }
}

export default myReducer;

