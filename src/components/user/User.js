import React, { Component, Fragment } from 'react';
import SimpleLayout from '../layout/SimpleLayout';
import { getUsers } from '../../redux/actions/usersActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTable from './getTable';
import Pagination from './Pagination';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getuser: {},
            page: 0,
            pageSize: 20
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.users) {
            return ({ getuser: nextProps.users.getuser })
        }
        return null;
    }

    componentDidMount() {
        const { page, pageSize } = this.state;
        this.props.getUsers(page, pageSize);
    }

    onPageChange = currentPage => {
        const { pageSize } = this.state;
        this.props.getUsers(currentPage, pageSize);
    }

    render() {
        const { content, totalElements } = this.state.getuser;

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
                                            {getTable(content)}
                                            <div className="pagination mt-2 text-center">
                                                { totalElements && 
                                                    <Pagination 
                                                        totalElements={totalElements}
                                                        onPageChange={this.onPageChange}
                                                    /> 
                                                }
                                            </div>
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

User.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    users: state.getallusers
});

export default connect(mapStateToProps, { getUsers })(User);
