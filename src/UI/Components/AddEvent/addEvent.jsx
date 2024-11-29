import React,{useState} from 'react'
import ImageUploader from './uploader';
import DynamicList from './dynamicList';
import MDEditor from '@uiw/react-md-editor';
import "./addEvent.css"
const AddEvent=({organisationUser})=>{

    const[eventTitle,setEventTitle]=useState("");
    const[eventDesc,setEventDesc]=useState("");
    const[eventDate,setEventDate]=useState("");
    const[eventTime,setEventTime]=useState("");
    const[eventLocation,setEventLocation]=useState("");
    const[volunteerCat,setVolunteerCat]=useState([]);
    const[sponsorCat,setSponsorCat]=useState([]);

    const handleAddCategory = () => {
        setVolunteerCat([...volunteerCat, '']); // Adds a new empty category
    };

    const handleCategoryChange = (value, index) => {
        const updatedVCategories = [...volunteerCat];
        updatedVCategories[index] = value;
        setVolunteerCat(updatedVCategories);
    };

    const handleDeleteCategory = (index) => {
        const updatedVCategories = volunteerCat.filter((_, i) => i !== index);
        setVolunteerCat(updatedVCategories.length ? updatedVCategories : []); // Set to empty array if no items left
    };

    const handleSponsorCategory = () => {
        setSponsorCat([...sponsorCat, '']); // Adds a new empty category
    };

    const handleSponsorChange = (value, index) => {
        const updatedSCategories = [...sponsorCat];
        updatedSCategories[index] = value;
        setSponsorCat(updatedSCategories);
    };

    const handleDeleteSponsor = (index) => {
        const updatedSCategories = sponsorCat.filter((_, i) => i !== index);
    setSponsorCat([...updatedSCategories]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            organisationName: organisationUser,
          eventTitle: eventTitle,
          eventDate: eventDate,
          eventTime: eventTime,
          eventLocation: eventLocation,
          eventDescription: eventDesc,
          sponsorList: volunteerCat,
          volunteerList: sponsorCat
        };
    
        try {
          const response = await fetch('/api/addevent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
    
          if (response.status === 201) {
            alert('Event added successfully!');
          } else {
            alert(data.error || 'An error occurred.');
          }
        } catch (err) {
          alert('Something went wrong. Please try again later.');
        }
      };

    return(
        <div className='addEventOuter'>
        <p id="HeadingAbc">Add Event</p>
        <form className='addEvent' onSubmit={handleSubmit}>
            <div className='outerPrt'>
            <div className='part1'>
            <div id="part1a">
            <label>
            <span>Title</span>
            <input 
            className='eventTitle'
            type="text"
            placeholder=""
            name="eventTitle"
            value={eventTitle}
            onChange={(event)=>setEventTitle(event.target.value)} />
        
            
        </label>
        

        <label>
        <span>Date</span>
            <input 
            className='eventDate'
            type="date"
            placeholder=""
            name="eventDate"
            value={eventDate}
            onChange={(event)=>setEventDate(event.target.value)} />
        
            
        </label>

        <label>
        <span>Time</span>
            <input 
            className='eventTime'
            type="time"
            placeholder=""
            name="eventTime"
            value={eventTime}
            onChange={(event)=>setEventTime(event.target.value)} />
        
            
        </label>
        <label>
        <span>Location</span>
            <input 
            className='eventLocation'
            type="text"
            placeholder=""
            name="eventLocation"
            value={eventLocation}
            onChange={(event)=>setEventLocation(event.target.value)} />
        
            
        </label>
        
        </div>

        <div id="part1b">

        <ImageUploader/>
        </div>
        </div>

        <label>
            <span>Description</span>
            <MDEditor
            className='eventDescription'
            type="text"
            placeholder=""
            name="eventDesc"
            value={eventDesc}
            onChange={setEventDesc} />
        
            
        </label>

        <label >
            
            <span>Enter the volunteer categories</span>
            <DynamicList
                        list={volunteerCat}
                        onAddItem={handleAddCategory}
                        onInputChange={handleCategoryChange}
                        onDeleteItem={handleDeleteCategory}
                    />
        </label>
        <label >
            
            <span>Enter the sponsor categories</span>
            <DynamicList
                        list={sponsorCat}
                        onAddItem={handleSponsorCategory}
                        onInputChange={handleSponsorChange}
                        onDeleteItem={handleDeleteSponsor}
                    />
        </label>
        
       
        {/* <div className='part2'> */}
        
       
        {/* </div> */}
        </div>



        <button type="submit">Submit</button>


        </form>

        </div>
    )
    
   
}
export default AddEvent;