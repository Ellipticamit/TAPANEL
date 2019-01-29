import React, { Component, Fragment } from 'react';
import SimpleLayout from '../layout/SimpleLayout';
import { getAllUsers } from '../../redux/actions/usersActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getAllUser: {}
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.getAllUser) {
            return ({ getAllUser: nextProps.getAllUser })
        }
        return null;
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    render() {
        const { getAllUser } = this.state;
        const data = getAllUser.getalluser.content;
        const columns = [{
            Header: 'Id',
            accessor: 'id',
            id: "id"
        }, {
            Header: 'User Name',
            accessor: 'userName',
            id: "username"
        },{
            Header: 'Password',
            accessor: 'password',
            id: "password"
        },{
            Header: 'Gender',
            accessor: 'gender',
            id: 'gender'
        }];

        return (
            <Fragment>
                <SimpleLayout />
                <div className="content-wrap">
                    <div className="main">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 p-0">
                                    <div className="page-header">
                                        <div className="page-title">
                                            <h1>All User Data</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-content p-1 mt-2">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <ReactTable
                                                data={data}
                                                filterable
                                                columns={columns}
                                                defaultPageSize={20}
                                                className="-striped -highlight"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Fragment>
        )
    }
}

Dashboard.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    getAllUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    getAllUser: state.getallusers
});

export default connect(mapStateToProps, { getAllUsers })(Dashboard);