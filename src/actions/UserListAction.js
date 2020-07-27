import _ from 'lodash';
import {
    GET_USERS,
    SET_ACTIVE_PAGE,
    UPDATE_SELECTED,
    UPDATE_SELECT_ALL,
    DELETE_SELECTED,
    DELETE_ROW
} from './types';

export const getUsers = () => {
    const value = JSON.parse(localStorage.getItem('Users'));
    const MaxRow = 5;
    if (Array.isArray(value)) {
        const totalPage = Math.ceil(value.length/MaxRow);
        const users = value.map(e => {
            return {...e, checked: false}
        })
        return {
            type: GET_USERS,
            payload: { users, totalPage }
        };
    } else {
        const users = [];
        const totalPage = 1;

        return {
            type: GET_USERS,
            payload: { users, totalPage }
        };
    }
}

export const setActivePage = (value) => {
    console.log(value)
    return {
        type: SET_ACTIVE_PAGE,
        payload: value
    };
}
export const updateSelected = (users, value) => {
    users[value] = {...users[value], checked: !users[value].checked};
    return {
        type: UPDATE_SELECTED,
        payload: users
    };
}

export const updateSelectAll = (users, value) => {
    // console.log(value);
    // console.log(!value);
    users = users.map(e => {
        return {...e, checked: !value}
    })
    return {
        type: UPDATE_SELECT_ALL,
        payload: {users, value: !value}
    };
}

export const deleteFromSelected = (users) => {
    users = _.reject(users, {checked: true});
    localStorage.setItem('Users', JSON.stringify(users));
    // console.log(value);
    // console.log(!value);
    // users = users.map(e => {
    //     return {...e, checked: !value}
    // })
    return {
        type: DELETE_SELECTED,
        payload: users
    };
}

export const deleteFromRow = (users, i) => {
    users.splice(i, 1);
    console.log(users)
    // users = _.reject(users, {checked: true});
    localStorage.setItem('Users', JSON.stringify(users));
    // console.log(value);
    // console.log(!value);
    // users = users.map(e => {
    //     return {...e, checked: !value}
    // })
    return {
        type: DELETE_ROW,
        payload: users
    };
}


