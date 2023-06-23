/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPhotoProduct = () => {
    const [name,setName]=useState("");
    const [file,setFile]=useState("");
    const [preview,setPreview]=useState(""); // for preview the image will be upload
    const navigate=useNavigate();
    const loadImage = (e) =>{
        const image = e.target.files[0];
        setFile(image);//sending to backend
        setPreview(URL.createObjectURL(image));//for set the url preview
        }

const savePhotoProduct = async (e) =>{
    //preventDefaul-sending the data, the page will not reload
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    console.log("ini", name);
    try {
        await axios.post("http://localhost:5000/api/mf/savephoto", formData,{
            headers:  {
                "Content-Type":"multipart/form-data"
            }
        });
        //auto direct homepage
        navigate("/");
    } catch (error) {
        console.log(error);
    }

    

}

  return (
   <div className="columns is-centered mt-5">
    <div className="column is-half">    
        <form onSubmit={savePhotoProduct}>
            <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                    <input className="input"
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                    placeholder='Product Name'/>
                </div>
            </div>

            <div className="field">
                <label className="label">Image</label>
                <div className="control">
                <div className="file">
                    <label className="file-label">
                        <input type="file" className='file-input' onChange={loadImage} />
                        <span className='file-cta'>
                            <span className='file-label'>Choose a file...</span>
                        </span>
                    </label>
                </div>
                </div>
            </div>

            {/*ternary operator if find obj in preview ? ,then will render the obj*/}
            {preview ? (
                <figure className='image is-128x128'>
                <img src={preview} alt="Preview Image"/>
                </figure>
            ):("")
            } 
            
            <div className="field mt-5 pt-6">
                <div className="control">
                    <button type="submit" className="button is-success">Save</button>
                </div>
            </div>
        </form>
    </div>
   </div>
 
  )
}

export default AddPhotoProduct