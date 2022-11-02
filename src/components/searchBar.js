import React, { useEffect } from 'react';
import axios from 'axios';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

 function Search(){
     

  const [search,setSearch]=useState([]);
  
  const [file, setFile] = useState()


       /*Uplaod File*/
  const handleSubmit=(event) =>{
      setFile(event.target.files);
      console.log(event.target.files);
      const data = new FormData();
      data.append('file',file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(`${process.env.REACT_APP_UPLAOD_URL}`,data,config).then(res => { 
        console.log(res); 
    })
    alert("File Uploaded");
  }
        
        /*Search File */

    const searchHandle = (e)=>{
      let key = e.target.value;
      console.log("key" , key);
      axios.post(`${process.env.REACT_APP_SEARCH_URL}${key}`)
      .then(response=>{
        setSearch(response.data);
       });
    }
   
    useEffect(()=>{});
   
    return(   

      <div class ="">
         <div class = "searchBox">
            
             <div class="search_box">
		           <div class="search_btn"><i class="fas fa-search"></i></div>
		           <input type="text" class="input_search" onChange={(e)=>searchHandle(e)} placeholder="Search"/>
	            </div>
         
             
             <div class="upload_box">
                
                    <input type="file" name="file" id="file" class="inputfile"   onChange={(e)=>handleSubmit(e)} />
           
                
                    <label for="file"><img src="icons8-upload-64.png"  onClick="" class="image" alt="" width="30" ></img> 
                         Uplaod file
                         
                     </label>
                    
                   
              </div>

          </div>
  
         <div className = "header_fixed">
             {
               search.map((da)=>
               <table>
                   <thead>
                      <tr>
                        <th> </th>
                        
                          <th>File Name</th>
                        
                          <th>View</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                        <td><img src="filesearchimg.png" alt=" "/></td>
                          
                          <td>{da.file_name}</td>
                        
                          <td><a href={da.file_url} class="button is-primary"><button>View</button></a></td>
                      </tr>
                   </tbody>
               </table>
             )}
         </div>

      </div>
    );
}

export default Search;