import {
    GET_USERS,
    SET_ACTIVE_PAGE,
    UPDATE_SELECTED,
    UPDATE_SELECT_ALL,
    DELETE_SELECTED,
    DELETE_ROW
} from '../actions/types';

const INITIAL_STATE = {
    users: [],
    totalPage: 1,
    maxRow: 5,
    activePage: 1,
    selectAll: false,
    selected: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USERS:
            return {...state, users: action.payload.users, totalPage: action.payload.totalPage};
        case SET_ACTIVE_PAGE:
            return {...state, activePage: action.payload};
        case UPDATE_SELECTED:
            return {...state, users: action.payload}
        case UPDATE_SELECT_ALL:
            return {...state, users: action.payload.users, selectAll: action.payload.value};
        case DELETE_SELECTED:
            return {...state, users: action.payload};
        case DELETE_ROW:
            return {...state, users: action.payload};
        default:
            return state;
    }
};
