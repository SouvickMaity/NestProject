import React,{ useState } from "react";
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import{useNavigate} from 'react-router-dom';

import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";




const ForgotPassword = () => {

     
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const Navigate = useNavigate();
  


    const handleSubmit = async(e) =>{
        e.preventDefault();
       try{
           const res= await axios.post('/api/v1/auth/forgot-password',{
            email,
            newPassword, 
            answer
        });
       if( res.data.success){
           toast.success(res.data.message);
             Navigate('/login');
           
       }else{
         toast.error(res.data.message);
       }
       
         }catch(err){
             console.log(err);
             toast.error('something go');
             
       }
     };




  return (
    <Layout>
        <div className="container">
  <div className="forms-container">
    <div className="signin-signup">
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <h2 className="title">Reset Password</h2>
        <div className="input-field">
          <i className="fas fa-user" />
          <input type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          id="exampleInputEmaill"
          placeholder="Enter your Email" 
          required
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock" />
          <input
           type="password"
           value={newPassword}
           onChange={(e)=>setNewPassword(e.target.value)}
           id="exampleInputPassword1"
            placeholder="Enter New Password"
            required
             />
        </div>

        <div className="input-field">
          <i className="fas fa-lock" />
          <input
           type="text"
           value={answer}
           onChange={(e)=>setAnswer(e.target.value)}
           id="exampleInputPassword1"
            placeholder=" your date of birth"
            required
             />
        </div>
       
     
        <input type="submit" defaultValue="login" className="btn btn-primary" />
        
      </form>
     
    </div>
  </div>
  <div className="panels-container">
    <div className="panel left-panel">
      <div className="content">
        <h3>Reset Your Password</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
          ex ratione. Aliquid!
        </p>
        <button className="btn transparent" id="sign">
          reset
        </button>
      </div>
     
    </div>
   
  </div>
  &nbsp;&nbsp;&nbsp;&nbsp;</div>

    </Layout>
  )
}

export default ForgotPassword 



