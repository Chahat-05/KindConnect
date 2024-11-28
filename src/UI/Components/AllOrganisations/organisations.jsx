import React, {useState, useEffect} from "react";
// import "./products.css";
import OrganisationCard from "./organisationCard";
import { useNavigate } from "react-router-dom";

const OrganisationPage = ({setShowNonprofit}) => {
    const [organisations, setOrganisations]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch organisation data from the backend
        const fetchOrganisations = async () => {
          try {
            const response = await fetch("/api/organisations");
            if (response.ok) {
              const data = await response.json();
              setOrganisations(data);
            } else {
              console.error("Failed to fetch organisations");
            }
          } catch (error) {
            console.error("Error fetching organisations:", error);
          }
        };
    
        fetchOrganisations();
      }, []);

    return (
        <div id="productMain">
            {organisations.map((organisation, index) => (
                <OrganisationCard
                    name={organisation.organisationName}
                    image={organisation.orgImage}
                    tagline={organisation.organisationTagline}
                    organisation={organisation}
                    setShowNonprofit={setShowNonprofit}
                />
            ))}
        </div>
    );
}

export default OrganisationPage;