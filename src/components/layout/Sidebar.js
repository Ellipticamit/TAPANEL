import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            dashboardActive: 'active',
            normalTableActive: ''
        }
    }

    addClassActive = tagname => e => {
        if (tagname === 'dashboard') {
            this.setState({
                dashboardActive: 'active',
                normalTableActive: ''
            });
        }

        if (tagname === 'normalTable') {
            this.setState({
                dashboardActive: '',
                normalTableActive: 'active'
            });
        }
    }

    render() {
        const { dashboardActive, normalTableActive } = this.state;
        return(
            <div className="sidebar">
                <div className="nano">
                    <div className="nano-content">
                        <ul>
                            <li className="label">Main</li>
                            <li className={`${dashboardActive}`} onClick={this.addClassActive('dashboard')}>
                                <Link to="/dashboard" className="sideBarLink"><i className="ti-home"></i> Dashboard (React Table)  </Link>
                            </li>
                            <li className={`${normalTableActive}`} onClick={this.addClassActive('normalTable')}>
                                <Link to="/user" className="sideBarLink"><i className="ti-home"></i> Dashboard (Normal Table) </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;