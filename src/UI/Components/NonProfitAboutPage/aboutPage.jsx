import { React, useState, useEffect } from "react";
import "./aboutPage.css";
import ReactMarkdown from "react-markdown";

export const AboutPage = ({showNonprofit}) => {
    const [organisationData, setOrganisationData] = useState(null);

    // Fetch the organisation data on component mount
    useEffect(() => {
        if (!showNonprofit) return; // Don't make the fetch if there's no organisation name
   
        const fetchOrganisation = async () => {
            try {
                const response = await fetch(`/api/about?organisationName=${showNonprofit}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                if (data && data.length > 0) {
                    setOrganisationData(data[0]); // Assuming you want the first organisation
                } else {
                    console.error("No data found for the organisation");
                }
            } catch (error) {
                console.error("Error fetching organisation data:", error);
            }
        };
        fetchOrganisation(); 
    }, [showNonprofit]);
    

    // Render loading message while data is being fetched
    if (!organisationData) {
        return <div>Loading...</div>;
    }

    // Extract the dynamic data
    const {
        organisationName,
        orgImage,
        organisationWebsite,
        organisationEmail,
        organisationPhone,
        aboutOrganisation,
        organisationPurpose,
        organisationTagline,
    } = organisationData;

    // Return the component with fetched data
    return (
        <div id="aboutMain">
            {/* Organisation header section */}
            <div
                id="colorText"
                style={{
                    background: `linear-gradient(#329d9c, #56c596)`,
                }}
            >
                {organisationName}
                <img src={orgImage} alt={`${organisationName} logo`} />
            </div>

            {/* About organisation */}
            <ReactMarkdown>{aboutOrganisation}</ReactMarkdown>

            {/* Organisation purpose */}
            <ReactMarkdown>{`### ${organisationPurpose}`}</ReactMarkdown>

            {/* Contact information */}
            <ReactMarkdown>
                {`### Contact Us
                
For inquiries, partnerships, or support, please reach out to us at:  

📧 Email: [${organisationEmail}](mailto:${organisationEmail})

🌐 Website: [${organisationWebsite}](${organisationWebsite})

📞 Phone: [${organisationPhone}](tel:${organisationPhone})

---`}
            </ReactMarkdown>

            {/* Tagline */}
            <ReactMarkdown>{`*${organisationTagline}*`}</ReactMarkdown>
        </div>
    );
};

export default AboutPage;
