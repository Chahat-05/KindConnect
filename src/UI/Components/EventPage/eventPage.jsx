import React from "react";
import "./eventPage.css";
import EventCard from "./eventCard";

export const EventPage = () => {
    const events = [
        {
            "organisation": {
                "name": "Hope for Children",
                "logo": "https://pbs.twimg.com/profile_images/650977752036843520/dX03tWTQ_400x400.jpg"
            },
            "event": {
                "name": "Back to School Drive",
                "description": "A charity event to collect school supplies and donations for underprivileged children, helping them prepare for the new school year.",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXeiu914nzgWFpnpoo1icShB8rZTPBDDDsug&s",
                "date": "2024-08-10",
                "venue": "City Community Hall, 123 Charity Lane"
            },
            "sponsorship_needed": [
                "School Supplies",
                "Refreshments",
                "Transportation"
            ],
            "volunteers": [
                "Anna Doe",
                "Mark Smith",
                "Lisa Green"
            ]
        },
        {
            "organisation": {
                "name": "Food for All",
                "logo": "https://pbs.twimg.com/profile_images/1166136963948322816/3rzknmqB_400x400.jpg"
            },
            "event": {
                "name": "Community Food Drive",
                "description": "A food drive to collect non-perishable items to support local food banks and feed the hungry in the community.",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKWuaVb0hHscoJvCWt7J_LGa-Rku4b_hAJA&s",
                "date": "2024-09-15",
                "venue": "Town Square, 456 Kindness Street"
            },
            "sponsorship_needed": [
                "Food Donations",
                "Logistics Support",
                "Advertising"
            ],
            "volunteers": [
                "Emily Taylor",
                "Sam Parker",
                "Robert Lee"
            ]
        },
        {
            "organisation": {
                "name": "Clean Water Initiative",
                "logo": "https://images.squarespace-cdn.com/content/v1/5e83c5f78f0db40cb837cfb5/1619037827960-JQHLLLRJ257TJPWBWENL/CWCLogo_pressresleases.jpg"
            },
            "event": {
                "name": "Walk for Clean Water",
                "description": "A charity walk to raise awareness and funds for clean water projects in developing countries, ensuring access to safe drinking water.",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jJZiSfKVTgqUSO7-C6p-wU1I_VzsUEaDVtzb4NVm_l57XsthzNNm3IpmdBsGm3KIy9s&usqp=CAU",
                "date": "2024-10-05",
                "venue": "Central Park, 789 Waterway Avenue"
            },
            "sponsorship_needed": [
                "Event Gear",
                "Drinks",
                "Medical Supplies"
            ],
            "volunteers": [
                "Nancy Adams",
                "Jake Wilson",
                "Laura White"
            ]
        },
        {
            "organisation": {
                "name": "Shelter for All",
                "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYrWfbFck5SBcy_S-SSQFb5XCO41yFRpR0w&s"
            },
            "event": {
                "name": "Winter Warmth Drive",
                "description": "A charitable event to collect winter clothing and blankets for the homeless community, helping them stay warm during the cold months.",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-N51vrrTUqSCOjaAp_MZ3vtToRdewCfJ1-A&s",
                "date": "2024-11-20",
                "venue": "Downtown Shelter, 101 Humanity Road"
            },
            "sponsorship_needed": [
                "Clothing Donations",
                "Logistics",
                "Marketing Materials"
            ],
            "volunteers": [
                "John Peters",
                "Sophia Brown",
                "Kevin Jones"
            ]
        },
        {
            "organisation": {
                "name": "Health and Hope",
                "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqJsvfXPM3JNFlrL2UHuj644UVEFpU3zIs5w&s"
            },
            "event": {
                "name": "Charity Health Camp",
                "description": "A free health camp offering medical check-ups, vaccinations, and health education to low-income families and underserved communities.",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSL5K2edp751XdHcVrvNcmzOVLxxxcJRjE5Q&s",
                "date": "2024-12-10",
                "venue": "Community Health Center, 321 Wellness Boulevard"
            },
            "sponsorship_needed": [
                "Medical Supplies",
                "Doctors and Nurses",
                "Event Promotion"
            ],
            "volunteers": [
                "Jessica Clark",
                "Michael Johnson",
                "Ashley Thompson"
            ]
        }
    ];


    return (
        <div id="eventPageMain">
            {events.map((eventData, index) => (
                <EventCard
                    key={index}
                    organisation={eventData.organisation}
                    event={eventData.event}
                    sponsorshipNeeded={eventData.sponsorship_needed}
                    volunteers={eventData.volunteers}
                />
            ))}
        </div>
    );
}

export default EventPage;