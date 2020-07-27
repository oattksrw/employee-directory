import {
    USER_CHANGE,
    USER_CREATE,
    USER_CREATE_LOADING,
    USER_CREATE_SUCCESS,
    CLEAR_FORM,
    USER_UPDATE_LOADING,
    USER_UPDATE_SUCCESS
} from './types'

export const userChange = ({ formElements, formValid }) => {
    return {
        type: USER_CHANGE,
        payload: { formElements, formValid }
    };
};

export const userCreate = (data) => {
    return (dispatch) => {
        dispatch({ type: USER_CREATE_LOADING });
        let Users = JSON.parse(localStorage.getItem('Users'));
        if (Array.isArray(Users)) {
            Users[Users.length] = data;
        } else {
            Users = []
            Users[0] = data;
        }
        localStorage.setItem('Users', JSON.stringify(Users));
        setTimeout(() => {
            dispatch({type: USER_CREATE_SUCCESS });
        }, 2000)
    }
}

export const updateUser = (uid, data) => {
    return (dispatch) => {
        dispatch({ type: USER_UPDATE_LOADING });
        let Users = JSON.parse(localStorage.getItem('Users'));
        Users[uid] = data;
        localStorage.setItem('Users', JSON.stringify(Users));
        setTimeout(() => {
            dispatch({type: USER_UPDATE_SUCCESS });
            window.location.reload(false);
        }, 2000)
    }
}

export const clearForm = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_FORM});
    }
}
