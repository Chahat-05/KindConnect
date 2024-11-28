import { React, useState, useEffect } from "react";
import "./aboutPage.css";
import ReactMarkdown from "react-markdown";

export const AboutPage = ({showNonprofit, username}) => {
    const [organisationData, setOrganisationData] = useState(null);
    const [amount,setAmount]=useState('');

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
    const today = new Date().toISOString().split("T")[0];

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Log the key to ensure it's correct
            // alert("Product ID (key) to delete:", productId);

            // Send the POST request to buy the product
            const formData = {
                username: username,
                amount: amount,
                category: "Direct Donation",
                date: today,
                organisation: organisationName,
            };
            const postResponse = await fetch(`/api/directDonation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const postData = await postResponse.json();

            if (postResponse.ok) {
                alert("Donation Made");
                console.log("POST Response:", postData);
            } else {
                console.log(`Error buying product: ${postData.message}`);
            }

        } catch (error) {
            console.error("Error in processing both requests:", error);
        }
    };

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
            <form onSubmit={handleClick}>
            <div id="directDonationButton">
                <input type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required></input>
                <button type="submit">Donate to Our Cause</button>
            </div>
            </form>
        </div>
    );
};

export default AboutPage;
