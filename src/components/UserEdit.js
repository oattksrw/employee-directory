import React, {Component} from 'react';
import _ from 'lodash'
import {connect} from 'react-redux'
import {
    Button,
    Form
} from 'semantic-ui-react';
import UserForm from "./UserForm";
import {userChange, userCreate, getUsers, updateUser} from '../actions';

class UserEdit extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const formElements = this.props.formElements;
        for (let key in formElements) {
            if (this.props.dataUser[key]){
                formElements[key].touched = true
                formElements[key].error = {
                    message: '',
                    error: false
                }
                formElements[key].value = this.props.dataUser[key];
            }
        }
        this.props.userChange({formElements, formValid: true});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = {};
        for (let name in this.props.formElements) {
            formData[name] = this.props.formElements[name].value;
        }
        this.props.userCreate(formData);
        this.props.updateUser(this.props.uid, formData);
        this.props.getUsers();
    }

    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <UserForm />
                <br />
                <Form.Field loading={this.props.loading} floated='right' control={Button} disabled={!this.props.formValid}>Save</Form.Field>
                <br/><br/>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    const {formElements, formValid, phoneCodes, nationalities, loading} = state.userForm;
    return {
        formElements, formValid, phoneCodes, nationalities, loading
    }
}

export default connect(mapStateToProps, {
    userChange, userCreate, getUsers, updateUser
})(UserEdit);
