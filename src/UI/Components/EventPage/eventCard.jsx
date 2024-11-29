import React from "react";
import "./eventPage.css";
import ReactMarkdown from "react-markdown";

export const EventCard = ({key,
    organisation,
    event,
    descriptionPreview,
    onClick,
image, logo }) => {
    return (
        /* From Uiverse.io by andrew-demchenk0 */ 
        /* From Uiverse.io by itsavicreation */
        <div className="card" onClick={onClick}>
            <div className="card__img">
                <img src={image}></img>
            </div>
            <div className="card__avatar">
                <img src={logo}></img>
            </div>
            <div className="card__title">{event}</div>
            <div className="card__subtitle">{organisation}</div>
            <div className="eventDescription"><ReactMarkdown>{descriptionPreview}</ReactMarkdown></div>
            
        </div>

    );
}

export default EventCard;