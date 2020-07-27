import React, {Component} from "react";
import _ from 'lodash';
import {connect} from "react-redux";
import {Table, Pagination, Button, Checkbox, Modal, Grid} from 'semantic-ui-react';
import UserEdit from './UserEdit';
import {
    getUsers,
    setActivePage,
    updateSelected,
    updateSelectAll,
    deleteFromSelected,
    deleteFromRow,
    clearForm
} from "../actions";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model_open: false
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleOpen= () => {
        this.setState({ model_open: true })
    }

    handleClose = () => {
        window.location.reload(false);
        this.setState({ model_open: false })
        this.props.clearForm();
        // this.props.clearForm();
    }

    handlePaginationChange = (e, { activePage }) => {
        this.props.setActivePage(activePage);
    }

    handleCheckRow = (i) => {
        this.props.updateSelected(this.props.users, i);
    }

    handleCheckBox = () => {
        this.props.updateSelectAll(this.props.users, this.props.selectAll);
    }

    onDeleteSelected = () => {
        this.props.deleteFromSelected(this.props.users);
    }

    onDeleteRow = (i) => {
        this.props.deleteFromRow(this.props.users, i);
    }

    renderRow = () => {
        // const users = this.props.users;
        const users = this.props.users.slice((this.props.activePage-1)*this.props.maxRow, 5*this.props.activePage);
        const list = users.map((e, i) => {
            const key = i+(this.props.activePage-1)*this.props.maxRow;
            return (
                <Table.Row key={key}>
                    <Table.Cell>
                        <Checkbox
                            onClick={() => this.handleCheckRow(key)}
                            checked={e.checked}
                            value={key}
                        />
                    </Table.Cell>
                    <Table.Cell>{e.firstName} {e.lastName}</Table.Cell>
                    <Table.Cell>{e.gender}</Table.Cell>
                    <Table.Cell>{e.codePhone} {e.phone}</Table.Cell>
                    <Table.Cell>{e.nationality}</Table.Cell>
                    <Table.Cell>
                        <Modal
                            style={{padding: '10px'}}
                            trigger={<Button onClick={this.handleOpen} size='mini' basic>Edit</Button>}
                            header='Edit User'
                            content={<UserEdit dataUser={e} uid={key} />}
                            onClose={this.handleClose}
                        />
                        <Button size='mini' basic onClick={() => this.onDeleteRow(key)}>
                            Delete
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )
        });
        return list;
    }

    render() {
        return (
            <div>
                <Checkbox name='SelectAll' label='Select All' onChange={this.handleCheckBox} checked={this.props.selectAll}/>
                {'  '}
                <Button onClick={this.onDeleteSelected} color='red'>Delete</Button>
                {/*{this.props.selected}*/}
                <Pagination floated='right' defaultActivePage={this.props.activePage} totalPages={this.props.totalPage} onPageChange={this.handlePaginationChange} />
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>NAME</Table.HeaderCell>
                            <Table.HeaderCell>GENDER</Table.HeaderCell>
                            <Table.HeaderCell>MOBILE PHONE</Table.HeaderCell>
                            <Table.HeaderCell>NATIONALITY</Table.HeaderCell>
                            <Table.HeaderCell> </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderRow()}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const users = _.map(state.userList.users, (val) => {
        return { ...val };
    });
    const {totalPage, maxRow, activePage, selectAll, selected, model_open} = state.userList;
    return {
        users, totalPage, maxRow, activePage, selectAll, selected, model_open
    };
};


export default connect(mapStateToProps, {
    getUsers, setActivePage, updateSelected, updateSelectAll, deleteFromSelected, deleteFromRow, clearForm
})(UserList);
