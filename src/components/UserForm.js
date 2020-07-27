import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux'
import {
    Checkbox,
    Form,
    Input
} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import MaskedInput from 'react-input-mask';
import PhoneCodeList from '../models/PhoneCodeList';
import NationalityList from "../models/NationalityList";
import {userChange, userCreate} from '../actions';

class UserForm extends Component {
    constructor(props) {
        super(props);
        // this.props =this.props.user;
    }

    componentWillMount() {
        this.getPhoneCode();
        this.getNationality();
    }

    getPhoneCode = () => {
        const phone_codes = PhoneCodeList.map((e, i) => {
            return {key: i, text: `(${e.name}) ${e.dial_code}`, value: e.dial_code}
        });
        this.setState({
            phoneCodes: phone_codes
        })
    }

    getNationality = () => {
        const nationalities = NationalityList.map((e, i) => {
            return {key: i, text: e, value: e}
        });
        this.setState({
            nationalities: nationalities
        })
    }

    onFormChange = (event, {name, value}) => {
        let updatedForm = {...this.props.formElements};
        updatedForm[name] = {
            ...updatedForm[name],
            value,
            touched: true
        }
        const validatorObject = this.checkValidator(value, updatedForm[name].validator);
        updatedForm[name].error = {
            status: validatorObject.status,
            message: validatorObject.message
        }
        let formStatus = true;
        for (let name in updatedForm) {
            if (updatedForm[name].validator.required === true || updatedForm[name].error.status) {
                formStatus = !updatedForm[name].error.status && formStatus
            }
        }
        this.props.userChange({formElements: updatedForm, formValid: formStatus});
    }

    checkValidator = (value, rule) => {
        let valid = true;
        let message = '';
        if (rule.required && value.trim().length === 0) {
            valid = false;
            message = 'Field is Require';
        }
        if (value.length < rule.minLength && valid && rule.minLength) {
            valid = false;
            message = `Less Than ${rule.minLength} Character`;
        }
        if (value.length > rule.maxLength && valid && rule.maxLength) {
            valid = false;
            message = `More Than ${rule.maxLength} Character`;
        }
        if (value.length != rule.equalLength && valid && rule.equalLength) {
            valid = false;
            message = `Equal ${rule.equalLength} Character`;
        }
        if (!rule.required && !value.length) {
            valid = true;
            message = ``;
        }
        if (rule.pattern === 'phone' && valid) {
            const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
            if (regex.test(value) === false) {
                valid = false;
                message = `Type of Phone is wrong`;
            }
        }
        if (rule.pattern === 'date' && valid) {
            const regex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
            if (regex.test(value) === false) {
                valid = false;
                message = `Type of Email is wrong`;
            }
        }
        if (rule.pattern === 'email' && valid) {
            const regex = /^[^\s@]+@[^\s@].[^\s@]+$/;
            if (regex.test(value) === false) {
                valid = false;
                message = `Type of Email is wrong`;
            }
        }
        if (rule.pattern === 'number' && valid) {
            const regex = /^[0-9]*$/;
            if (regex.test(value) === false) {
                valid = false;
                message = `Type of Number is wrong`;
            }
        }
        return {status: !valid, message}
    }

    getErrorMessage = (name) => {
        return this.props.formElements[name].error.message;
    }

    getInputClass = (name) => {
        const elementErrorStatus = this.props.formElements[name].error.status;
        return elementErrorStatus && this.props.formElements[name].touched ? true :
            !this.props.formElements[name].touched ? false : false;
    }

    render() {
        return (
            <div>
                <Form.Group widths='equal'>
                    <Form.Select
                        name='title'
                        label='Title'
                        value={this.props.formElements.title.value}
                        onChange={this.onFormChange}
                        error={this.getInputClass('title')}
                        options={title}
                        placeholder=''
                        autoComplete="off"
                        required
                    />
                    <Form.Field
                        control={Input}
                        label="First Name"
                        name="firstName"
                        placeholder="First Name"
                        value={this.props.formElements.firstName.value}
                        onChange={this.onFormChange}
                        error={this.getInputClass('firstName')}
                        autoComplete="off"
                    />
                    <Form.Field
                        control={Input}
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        value={this.props.formElements.lastName.value}
                        onChange={this.onFormChange}
                        error={this.getInputClass('lastName')}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <DateInput
                        control={Input}
                        label="Birthday"
                        name="birthday"
                        placeholder="Date"
                        value={this.props.formElements.birthday.value}
                        iconPosition="left"
                        onChange={this.onFormChange}
                        error={this.getInputClass('birthday')}
                        animation='false'
                        autoComplete="off"
                    />
                    <Form.Select
                        search
                        label="Nationality"
                        name="nationality"
                        options={this.state.nationalities}
                        placeholder=""
                        autoComplete="off"
                        onChange={this.onFormChange}
                        value={this.props.formElements.nationality.value}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        control={Input}
                        label='Citizen ID'
                        width={16}
                        maxLength={13}
                        autoComplete="off"
                        error={this.getInputClass('citizenID')}
                        children={
                            <MaskedInput
                                value={this.props.formElements.citizenID.value}
                                onChange={e => {
                                    this.onFormChange(e, {name: 'citizenID', value: e.target.value})
                                }}
                                mask='9-9999-99999-99-9'
                                maskChar={null}
                            />
                        }
                    />
                </Form.Group>
                <Form.Group inline>
                    <label>Gender</label>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Male'
                            name='gender'
                            value='Male'
                            checked={this.props.formElements.gender.value === 'Male'}
                            onChange={this.onFormChange}
                            autoComplete="off"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Female'
                            name='gender'
                            value='Female'
                            checked={this.props.formElements.gender.value === 'Female'}
                            onChange={this.onFormChange}
                            autoComplete="off"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Unisex'
                            name='gender'
                            value='Unisex'
                            checked={this.props.formElements.gender.value === 'Unisex'}
                            onChange={this.onFormChange}
                            autoComplete="off"
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Field required>
                    <label>Mobile Phone</label>
                </Form.Field>
                <Form.Group>
                    <Form.Select
                        search
                        name='codePhone'
                        options={this.state.phoneCodes}
                        placeholder=''
                        width={4}
                        autoComplete="off"
                        onChange={this.onFormChange}
                        value={this.props.formElements.codePhone.value}
                    />
                    <Form.Field
                        control={Input}
                        maxLength={10}
                        name="phone"
                        placeholder=""
                        value={this.props.formElements.phone.value}
                        onChange={this.onFormChange}
                        error={this.getInputClass('phone')}
                        width={12}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Input
                    name='passportNo'
                    label='Passport No'
                    placeholder=''
                    maxLength={9}
                    width={16}
                    value={this.props.formElements.passportNo.value}
                    onChange={this.onFormChange}
                    error={this.getInputClass('passportNo')}
                    autoComplete="off"
                />
                <Form.Field
                    control={Input}
                    label="Expect Salary"
                    name="salary"
                    placeholder=""
                    value={this.props.formElements.salary.value}
                    onChange={this.onFormChange}
                    error={this.getInputClass('salary')}
                    autoComplete="off"
                />
            </div>
        )
    }
}

const title = [
    {key: 'Mr', text: 'Mr.', value: 'Mr'},
    {key: 'Mrs', text: 'Mrs.', value: 'Mrs'},
    {key: 'Ms', text: 'Ms.', value: 'Ms'},
];
const mapStateToProps = (state) => {
    // const formElements = _.map(state.userForm.formElements, (val) => {
    //     return { ...val };
    // });

    const {formElements, formValid, phoneCodes, nationalities, loading} = state.userForm;
    return {
        formElements, formValid, phoneCodes, nationalities, loading
    }
}

export default connect(mapStateToProps, {
    userChange, userCreate
})(UserForm);
