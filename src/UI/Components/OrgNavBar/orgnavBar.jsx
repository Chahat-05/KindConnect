import React from "react";
import "./orgnavBar.css";
import 'boxicons';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div id="sideNavMain">
            <div id="navprofile">
                <box-icon name='menu'></box-icon>
            </div>
            <div id="navBarButtons">
                <div className="button" onClick={() => navigate('/orgEvents')}>
                    <box-icon name='calendar-event' color='#626262' ></box-icon> 
                    Events
                </div>
                <div className="button" onClick={() => navigate('/donation')}>
                    <box-icon name='group' color='#626262'></box-icon>
                    View Donations 
                </div>
                <div className="button" onClick={() => navigate('/profile')}>
                <box-icon name='user-circle' color='#626262'></box-icon>
                    Profile
                </div>
                <div className="button" onClick={() => navigate('/')}>
                <box-icon name='log-out-circle' color='#626262'></box-icon>
                Logout
            </div>
            </div>
            <div id="logoutButton"></div>
        </div>
    );
}

export default Navbar;