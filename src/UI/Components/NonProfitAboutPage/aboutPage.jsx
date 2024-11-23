import React from "react";
import "./aboutPage.css";
import ReactMarkdown from "react-markdown";

export const AboutPage = () => {
    const color1 = "#329d9c";
    const color2 = "#56c596";
    const name = "Health and Hope";
    const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqJsvfXPM3JNFlrL2UHuj644UVEFpU3zIs5w&s";
    const website = "https://www.healthandhope.org";
    const email = "contact@healthandhope.org";
    const contact = "1234567890";
    const purpose = "A world where no one suffers due to a lack of access to healthcare. We envision empowered communities that thrive through education, prevention, and quality care.";
    const tagline = "Together, we can make health and hope a reality for all.";
    const visionMarkdown = `### ${purpose}`;
    const aboutPageMarkdown = ` 
# About Us

Welcome to **Health and Hope**, a nonprofit organization dedicated to providing accessible healthcare and promoting wellness for underserved communities worldwide.

## Our Mission

At *Health and Hope*, our mission is to ensure that every individual, regardless of their background, has access to basic healthcare services and the opportunity to live a healthy, fulfilling life.

We believe that hope begins with health, and through our programs, we aim to transform lives by:
- Offering free medical consultations and treatments.
- Hosting wellness camps and preventive healthcare drives.
- Providing health education and awareness programs.
- Distributing essential medicines and supplies to those in need.

![Community Wellness Camp](https://via.placeholder.com/300x200 "Community Wellness Camp")

## What We Do

**1. Medical Camps**  
We organize regular medical camps to bring essential healthcare services to remote areas. Our dedicated team of doctors and volunteers ensures that patients receive quality care and follow-up.

**2. Health Education**  
Our workshops focus on educating communities about preventive measures, nutrition, hygiene, and mental health.

**3. Emergency Response**  
In times of natural disasters or emergencies, *Health and Hope* steps in to provide immediate medical aid, supplies, and support.

![Emergency Relief Effort](https://via.placeholder.com/300x200 "Emergency Relief Effort")

## Our Impact

Since our founding, we have:
- Treated over **10,000 patients** through free clinics and camps.
- Conducted **50+ health workshops** on preventive care.
- Distributed **50 tons of medical supplies** to underserved communities.

## Join Us

Be a part of the change. Whether you want to volunteer, donate, or spread the word, every action helps us bring health and hope to more lives.
`;

    const contactMarkdown = `### Contact Us

For inquiries, partnerships, or support, please reach out to us at:  

📧 Email: [${email}](mailto:${email})

🌐 Website: [${website}](${website})

📞 Phone: [${contact}](tel:${contact})

---`;

    const taglineMarkdown = `*${tagline}*`

    return (
        <div id="aboutMain">
            <div id="colorText" style={{ background: `linear-gradient(${color1}, ${color2})` }}>
                {name}
                <img src={logo}></img>
            </div>
            <ReactMarkdown>{aboutPageMarkdown}</ReactMarkdown>
            <ReactMarkdown>{visionMarkdown}</ReactMarkdown>
            <ReactMarkdown>{contactMarkdown}</ReactMarkdown>
            <ReactMarkdown>{taglineMarkdown}</ReactMarkdown>
        </div>
    );
}

export default AboutPage;