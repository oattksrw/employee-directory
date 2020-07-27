import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Button,
    Form
} from 'semantic-ui-react';
import UserForm from "./UserForm";
import {userChange, userCreate, getUsers} from '../actions';

class UserCreate extends Component {
    constructor(props) {
        super(props);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = {};
        for (let name in this.props.formElements) {
            formData[name] = this.props.formElements[name].value;
        }
        this.props.userCreate(formData);
        this.props.getUsers();
    }

    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <UserForm />
                <br />
                <Form.Field loading={this.props.loading} floated='right' control={Button} disabled={!this.props.formValid}>Submit</Form.Field>
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
    userChange, userCreate, getUsers
})(UserCreate);
