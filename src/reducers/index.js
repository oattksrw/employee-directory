import { combineReducers } from 'redux';
import UserFormReducer from './UserFormReducer';
import UserListReducer from './UserListReducer';

export default combineReducers({
    userForm: UserFormReducer,
    userList: UserListReducer
});
