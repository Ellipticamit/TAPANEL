import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextFieldGroup } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { loginUser } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.auth.isAuthenticated) {
            nextProps.history.push('/dashboard');
        }

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
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard');
        }
    }

    render() {
        const { username, password, errors } = this.state;
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
                                    <h5 className="mb-4">User Login</h5>
                                    {errors.unauthorized &&
                                        <div className="alert alert-danger" role="alert">
                                            {errors.unauthorized}
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
                                        <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30">Sign in</button>

                                        <div className="register-link mt-4 pt-2 text-center">
                                            Don't have account ? <Link to="/register"> Sign Up Here</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { loginUser})(withRouter(Login));