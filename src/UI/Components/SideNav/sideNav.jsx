import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./sideNav.css";
import 'boxicons';

export const EventPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    return (
        <div id="sideNavMain">
            <div id="navprofile">
                <box-icon name='menu'></box-icon>
            </div>
            <div id="navBarButtons"> 
                <div className="button" onClick={() => navigate('/events')}> 
                    <box-icon name='calendar-event' color='#626262'></box-icon>
                    Events
                </div>
                <div className="button" onClick={() => navigate('/products')}>
                    <box-icon name='cart-add' color='#626262'></box-icon>
                    Buy Products
                </div>
                <div className="button" onClick={() => navigate('/organisations')}>
                    <box-icon name='group' color='#626262'></box-icon>
                    Non-Profits
                </div>
            </div>
            <div className="button" onClick={() => navigate('/')}>
                <box-icon name='log-out-circle' color='#626262'></box-icon>
                Logout
            </div>
        </div>
    );
}

export default EventPage;
