import {
    USER_CHANGE,
    USER_CREATE_LOADING,
    USER_CREATE_SUCCESS,
    CLEAR_FORM,
    USER_UPDATE_LOADING,
    USER_UPDATE_SUCCESS
} from '../actions/types';


const defaultForm = {
    type: 'text',
    touched: false,
    error: {status: true, message: ''}
}
const defaultFormWithValue = {
    type: 'text',
    touched: true,
    error: {status: false, message: ''}
}
const typeInput = {
    normal: {
        validator: {
            required: false,
        }
    },
    max20R: {
        validator: {
            required: true,
            maxLength: 20
        }
    },
    phone: {
        validator: {
            pattern: 'phone',
            required: true,
            maxLength: 10
        }
    },
    number: {
        validator: {
            pattern: 'number',
            required: false
        }
    },
    dateR: {
        validator: {
            required: true,
            pattern: 'date'
        }
    },
    citizen: {
        validator: {
            required: false,
            equalLength: 17
        }
    }
}
const INITIAL_STATE = {
    formElements: {
        title: {...defaultFormWithValue, ...typeInput.max20R, value: 'Mr'},
        firstName: {...defaultForm, ...typeInput.max20R, value: ''},
        lastName: {...defaultForm, ...typeInput.max20R, value: ''},
        birthday: {...defaultForm, ...typeInput.max20R, value: ''},
        nationality: {...defaultFormWithValue, ...typeInput.max20R, value: 'Thai'},
        citizenID: {...defaultForm, ...typeInput.citizen, value: ''},
        gender: {...defaultFormWithValue, ...typeInput.normal,  value: 'Male'},
        codePhone: {...defaultFormWithValue, ...typeInput.max20R,  value: '+66'},
        phone: {...defaultForm, ...typeInput.phone,  value: ''},
        passportNo: {...defaultForm, ...typeInput.normal,  value: ''},
        salary: {...defaultForm, ...typeInput.number,  value: ''}

    },
    formValid: false,
    phoneCodes: [],
    nationalities: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    //console.log(action.payload.prop, action.payload.value)
    switch (action.type) {
        case USER_CHANGE:
            return { ...state, formElements: action.payload.formElements, formValid: action.payload.formValid };
        case USER_CREATE_LOADING:
            return  {...state, loading: true }
        case USER_CREATE_SUCCESS:
            return  {...INITIAL_STATE, loading: false }
        case USER_UPDATE_LOADING:
            return  {...state, loading: true }
        case USER_UPDATE_SUCCESS:
            return  {...INITIAL_STATE, loading: false }
        case CLEAR_FORM:
            return INITIAL_STATE
        default:
            return state;
    }
}
