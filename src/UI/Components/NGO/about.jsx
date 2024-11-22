import React,{useState} from 'react'
import "./signupinfo.css" 
import ImageUploader from './uploader';
import MDEditor from '@uiw/react-md-editor';
// import ImageUploader from './uploader';
import MultipleImageUploader from './multipleUploader';
const AboutInfo=()=>{

    const[ngoId,setNgoId]=useState("");
    const[ngoName,setNgoName]=useState("");
    const[signupPassword,setPassword]=useState("");
    const[signupPassword2,setPassword2]=useState("");
    const[ngoPurpose,setNgoPurpose]=useState("");
    const[ngoAbout,setNgoAbout]=useState("");
    const[ngoEmail,setNgoEmail]=useState("");
    const[ngoWebsite,setNgoWebsite]=useState("");
    const[ngoContact,setNgoContact]=useState("");
    const[ngoTagline,setNgoTagline]=useState("");
    // const[selectedTab,setSelectedtab]=useState('write')
    

    // const converter=new Showdown.Converter({
    //     tables: true,
    //     simplifiedAutoLink:true,
    //     strikethrough:true,
    //     tasklists:true,
    // });
    return(
<div className='signUpinfo'>
    <ImageUploader/>
    {/* <MultipleImageUploader/> */}
    <form className='signupForm'>
    <p class="titleA">Register </p>
    <p class="message">Signup now and get full access to our app. </p>
        <div className="combine">
        <label >
            <input 
            className='SignupInput'
            type="text" 
            placeholder=""
            name="NgoId"
            value={ngoId}
            onChange={(event)=>setNgoId(event.target.value)}
            required=""
            />
            <span>NGO-id</span>
        </label>

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

        <button className="submit">Submit</button>

    </form>
</div>
    )
}
export default AboutInfo;