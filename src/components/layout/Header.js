import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/authActions';
import { withRouter } from "react-router-dom";

class Header extends Component {

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
        if (this.props.auth.isAuthenticated === false) {
            this.props.history.push("/");
        }
    }
      
    render() {
        return (
        <div className="header">
            <div className="float-left">
                <div className="logo"><Link to="/dashboard"><span>TA Panel</span></Link></div>
            </div>
        
            <div className="float-right pr-5 pt-3">
                <span className="logout" onClick={this.onLogoutClick}>Logout</span>
            </div>
        </div>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps, { logoutUser })(withRouter(Header));