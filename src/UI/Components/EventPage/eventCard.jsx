import React from "react";
import "./eventPage.css";

export const EventCard = ({key,
    organisation,
    event}) => {
    return (
        /* From Uiverse.io by andrew-demchenk0 */
        /* From Uiverse.io by itsavicreation */
        <div className="card">
            <div className="card__img">
                <img src={event.image}></img>
            </div>
            <div className="card__avatar">
                <img src={organisation.logo}></img>
            </div>
            <div className="card__title">{event
            .name}</div>
            <div className="card__subtitle">{organisation.name}</div>
            <div className="eventDescription">{event.description}</div>
            
        </div>

    );
}

export default EventCard;