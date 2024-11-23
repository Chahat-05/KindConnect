import React from "react";
import "./sideNav.css";
import 'boxicons';

export const EventPage = () => {
    return (
        <div id="sideNavMain">
            <div id="navprofile">
                <box-icon name='menu'></box-icon>
            </div>
            <div id="navBarButtons">
                <div className="button">
                    <box-icon name='calendar-event' color='#626262' ></box-icon>
                    Events
                </div>
                <div className="button">
                    <box-icon name='cart-add' color='#626262'></box-icon>
                    Buy Products
                </div>
                <div className="button">
                    <box-icon name='group' color='#626262'></box-icon>
                    Non-Profits
                </div>
                <div className="button">
                <box-icon name='user-circle' color='#626262'></box-icon>
                    Profile
                </div>
            </div>
            <div id="logoutButton"></div>
        </div>
    );
}

export default EventPage;