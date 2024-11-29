import React,{useState} from 'react'
import "./register.css" 
import ImageUploader from './uploader';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from "react-router-dom";
// import ImageUploader from './uploader';
// import MultipleImageUploader from './multipleUploader';
const AboutInfo=()=>{
    
    const [color1, setColor1] = useState('#000000'); 
    const [color2, setColor2] = useState('#ffffff');
    const[ngoName,setNgoName]=useState("");
    const[signupPassword,setPassword]=useState("");
    const[signupPassword2,setPassword2]=useState("");
    const[ngoPurpose,setNgoPurpose]=useState("");
    const[ngoAbout,setNgoAbout]=useState("");
    const[ngoEmail,setNgoEmail]=useState("");
    const[ngoWebsite,setNgoWebsite]=useState("");
    const[ngoContact,setNgoContact]=useState("");
    const[ngoTagline,setNgoTagline]=useState("");
    const navigate = useNavigate();
    // const[selectedTab,setSelectedtab]=useState('write')
    

    // const converter=new Showdown.Converter({
    //     tables: true,
    //     simplifiedAutoLink:true,
    //     strikethrough:true,
    //     tasklists:true,
    // });

    const handleSubmit = async (event) => {
        event.preventDefault();

    
        // Prepare the data to be sent to the backend
        const formData = {
            organisationName: ngoName,
            organisationEmail: ngoEmail,
            organisationWebsite: ngoWebsite,
            organisationPurpose: ngoPurpose,
            aboutOrganisation: ngoAbout,
            organisationPhone: ngoContact,
            organisationTagline: ngoTagline,
            password: signupPassword,
            confirmPassword: signupPassword2,
            color1,
            color2
        };
    
        try {
          // Make the POST request to the backend
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
          alert(formData);
    
          if (response.status === 201) {
             // Show success message
          } else {
             // Show error message
          }
        } catch (err) {
        //   setError('Something went wrong. Please try again later.');
        }
      };
   
    return(
<div className='signUpinfo'>

    {/* <MultipleImageUploader/> */}
    <form className='signupForm' onSubmit={handleSubmit}>
    <p class="titleA">Register </p>
    <p onClick={()=>{navigate('/login')} }style={{cursor:"pointer", color:"blue"}}>or Click Here to Login </p>
    <p class="message">Signup now and get full access to our app. </p>
        <div className="combine">

        <label>
            <input 
            className='SignupInput'
            type="text"
            placeholder=""
            name="NgoName"
            value={ngoName}
            onChange={(event)=>setNgoName(event.target.value)} />
            <span>Ngo-Name</span>
        </label>
        </div>
<div className="combine">
        <label>
            <input 
            className='SignupInput'
            type="password"
            placeholder=""
            name="signupPassword"
            value={signupPassword}
            onChange={(event)=>setPassword(event.target.value)} />
            <span>Enter password</span>
        </label>

        <label>
            <input 
            className='SignupInput'
            type="password"
            placeholder=""
            name="passsword2"
            value={signupPassword2}
            onChange={(event)=>setPassword2(event.target.value)} />
            <span>Confirm Password</span>
        </label>
        </div>
        {/* <div>
            <input 
            type="text"
            placeholder="Ngo-Name"
            name="NgoName"
            value={ngoName}
            onChange={(event)=>setNgoName(event.target.value)} />
        </div> */}
        <div className="combine">
        <label>
            <input 
             className='SignupInput'
            type="url"
            placeholder=""
            name="NgoWebsite"
            value={ngoWebsite}
            onChange={(event)=>setNgoWebsite(event.target.value)} />
            <span>Website</span>
        </label>

        <label>
            <input
             className='SignupInput' 
            type="email"
            placeholder=""
            name="Ngoemail"
            value={ngoEmail}
            onChange={(event)=>setNgoEmail(event.target.value)} />
            <span>Email</span>
        </label>
        <label>
            <input 
            className='SignupInput'
            type="tel"
            placeholder=""
            name="NgoContact"
            pattern='[1-9]{1}[0-9]{9}'
            value={ngoContact}
            onChange={(event)=>setNgoContact(event.target.value)} />
            <span>contact number</span>
        </label>
        
        </div>


        <label>
            <textarea 
            className='SignupInput'
            type="text"
            placeholder=""
            name="Purpose"
            value={ngoPurpose}
            onChange={(event)=>setNgoPurpose(event.target.value)} />
        
            <span>Purpose</span>
        </label>
        <label>
            <MDEditor
             className='SignupInput'
             
            
            type="text"
            placeholder=""
            name="Ngoabout"
            value={ngoAbout}
            onChange={setNgoAbout}
            style={{ height: 300 }} />
            <span>About</span>
        </label>


        {/* <div>
            <input 
            type="text"
            placeholder="Website"
            name="NgoWebsite"
            value={ngoWebsite}
            onChange={(event)=>setNgoWebsite(event.target.value)} />
        </div>

        <div>
            <input 
            type="text"
            placeholder="Website"
            name="NgoWebsite"
            value={ngoWebsite}
            onChange={(event)=>setNgoWebsite(event.target.value)} />
        </div> */}

        

        <label>
            <input 
             className='SignupInput'
            type="text"
            placeholder=""
            name="NgoTagline"
            value={ngoTagline}
            onChange={(event)=>setNgoTagline(event.target.value)} />

            <span>Tagline</span>
        </label>
        <label>

<span  className='colorpick'>Upload NGO's logo</span>
<ImageUploader/>
</label>
        <label>
        <span className="colorpick">Choose a color from color pallete   </span>
        
        <input
          type="color"
          placeholder="Color1"
          name="color1"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
          className="color-picker"
        />
        
        </label>
        <label>
        <span className="colorpick">Choose second color from color pallete   </span>
        
        <input
          type="color"
          placeholder="Color2"
          name="color2"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
          className="color-picker"
        />
        
        </label>

        <button className="submit" type="submit">Submit</button>

    </form>
</div>
    )
}
export default AboutInfo;