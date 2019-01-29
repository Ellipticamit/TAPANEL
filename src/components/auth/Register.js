import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextFieldGroup } from '../common/TextFieldGroup';
import { registerUser } from '../../redux/actions/authActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            gender: 'MALE',
            selected: true,
            errors: {}
          };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.error) {
            return ({
                errors: nextProps.error
            });
        }
        
       return null;
    }
 
    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            userName: this.state.username,
            password: this.state.password,
            gender: this.state.gender
        }
        this.props.registerUser(userData, this.props.history);
    }

    onChange = (e) => {
        if(e.target.name === 'gender') {
            this.setState({
                selected: !this.state.selected
            });
        } 
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        const { username, password, selected, errors } = this.state;
        return (
            <div className="bg-login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="login-content">
                                <div className="login-logo">
                                    <Link to="/"><span>Panel </span></Link>
                                </div>
                                <div className="login-form">
                                    <h5 className="mb-4">User Registeration</h5>
                                    {errors.exist &&
                                        <div className="alert alert-danger" role="alert">
                                            {errors.exist}
                                        </div>
                                    }
                                    <form onSubmit={this.onSubmit}>
                                        <TextFieldGroup 
                                            name="username"
                                            label="username"
                                            value={username}
                                            placeholder="E.g. username"
                                            onChange={this.onChange}
                                        />
                                        <TextFieldGroup 
                                            type="password"
                                            name="password"
                                            label="password"
                                            value={password}
                                            placeholder="E.g. 123123"
                                            onChange={this.onChange}
                                        />
                                        <div className="checkbox mb-2">
                                            <label className="col-6">
                                                <input 
                                                    type="radio"
                                                    name="gender" 
                                                    value="MALE"
                                                    checked={selected}
                                                    onChange={this.onChange}
                                                /> Male
                                            </label>	
                                            <label>
                                                <input 
                                                    type="radio" 
                                                    name="gender"
                                                    value="FEMALE"
                                                    checked={!selected}
                                                    onChange={this.onChange}
                                                /> Female
                                            </label>								
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30">Sign Up</button>

                                        <div className="register-link mt-4 pt-4 text-center">
                                            Already have account ?  <Link to="/"> Sign In </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
