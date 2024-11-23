import React from "react";
import "./viewEvent.css";
import ReactMarkdown from "react-markdown";

export const ViewEventPage = () => {
    const name = "Health and Hope";
    const date = "Saturday, 15th March 2025";
    const time = "9:00 AM to 4:00 PM ";
    const title = "Charity Health Camp";
    const location = `Community Hall, Green Meadows Center  
123 Hope Avenue, Wellness City, Stateville  

The venue is easily accessible and equipped with comfortable seating, drinking water facilities, and a children’s play area to make your visit convenient and stress-free. Parking is available on-site, and volunteers will be present to assist you throughout the event.  

Come join us and take a step toward better health and well-being!  `;
    const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqJsvfXPM3JNFlrL2UHuj644UVEFpU3zIs5w&s";
    const description = `#  ${title}

We are excited to announce a **Charity Health Camp** aimed at bringing free and accessible healthcare to underserved communities. At this event, we will offer a range of medical services designed to address the immediate health needs of individuals and families who may not have regular access to care.

## What You Can Expect:

- **Free Health Screenings**: Comprehensive checkups to monitor vital signs, identify potential health concerns, and provide early detection of common ailments.  
- **Doctor Consultations**: One-on-one sessions with experienced medical professionals who will offer personalized advice, treatment options, and follow-up recommendations.  
- **Medicines and Supplies**: Essential medicines, vitamins, and basic health kits will be distributed to those in need, completely free of charge.  
- **Health Education**: Interactive sessions to raise awareness about preventive care, nutrition, hygiene, and maintaining a healthy lifestyle.  
- **Specialized Care**: Focused support for vulnerable groups, including children, the elderly, and individuals with chronic conditions.

This health camp is part of our ongoing commitment to making quality healthcare accessible to everyone. Our dedicated team of doctors, nurses, and volunteers is passionate about creating a healthier future for all.

Together, let’s take a step toward a healthier, more empowered community.  
*"Because health is the foundation of hope."*
`;
    const details =
        `📅 **Date**: ${date} 

⏰ **Time**: ${time}

📍 **Location**: ${location}
`;

    const sponsorshipTypes = [
        "Medical Equipment and Supplies",
        "Medicine Sponsorship",
        "Venue and Infrastructure",
        "Volunteer Support",
        "Promotional Activities",
        "Refreshments for Attendees",
        "Transportation",
        "Specialized Care Units"
    ];

    const volunteerTypes = [
        "Doctors and Medical Professionals",
        "Nurses and Paramedics",
        "Administrative Support",
        "Event Coordinators",
        "Logistics and Setup Helpers",
        "Health Educators",
        "Community Outreach Volunteers",
        "General Helpers"
    ];

    return (
        <div id="viewEventMain">
            <div id="colorText1" style={{
                background: `
      linear-gradient(
        rgba(0, 0, 0, 0.5), 
        rgba(0, 0, 0, 0.5)
      ), 
      url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSL5K2edp751XdHcVrvNcmzOVLxxxcJRjE5Q&s")
    `,

                backgroundPosition: "center",
            }}>
                {name}
                <img src={logo}></img>
            </div>
            <div id="textMain">
                <div id="eventDescription"><ReactMarkdown>{description}</ReactMarkdown></div>
                <div id="eventDetails"><ReactMarkdown>{details}</ReactMarkdown>
                    <div id="eventButtons">
                    </div>
                </div>
                <div id="moreDetails">
                    <h2>Sponsors Required:</h2>
                    <ul>
                        {sponsorshipTypes.map((sponsorship, index) => (
                            <li key={index}>{sponsorship}</li>
                        ))}
                    </ul>
                    <button>Sponsor this Event</button>
                    <h2>Volunteers Required:</h2>
                    <ul>
                        {volunteerTypes.map((volunteer, index) => (
                            <li key={index}>{volunteer}</li>
                        ))}
                    </ul>
                    <button>Become a Volunteer</button>
                </div>
            </div>
        </div>
    );
}

export default ViewEventPage;