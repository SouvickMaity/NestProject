
import React,{ useState } from "react";
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import{useNavigate,useLocation} from 'react-router-dom';

import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";




const Login = () => {

      
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const[auth,setAuth]=useAuth();
    const location =useLocation();



    const handleSubmit=async(e)=>{
        e.preventDefault();
       try{
           const res= await axios.post("/api/v1/auth/login",{
            email,
            password
        });
       if(res && res.data.success){
           toast.success(res.data && res.data.message);
           setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
           });
           localStorage.setItem("auth",JSON.stringify(res.data));
           Navigate( location.state ||'/');
           
       }else{
         toast.error(res.data.message);
       }
       
         }catch(error){
             console.log(error);
             toast.error('something wrong');
       }
     };
 



  return (
    <Layout  >
  <div className="container">
  <div className="forms-container">
    <div className="signin-signup">
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <h2 className="title">Login</h2>
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
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           id="exampleInputPassword1"
            placeholder="Password"
            required
             />
        </div>
        <input type="button" defaultValue="forgot password"  className="btn btn-primary" onClick={()=>{Navigate("/forgot-password")}}/>
        
     
        <input type="submit" defaultValue="Login" className="btn btn-primary" />
        
      </form>
     
    </div>
  </div>
  <div className="panels-container">
    <div className="panel left-panel">
      <div className="content">
        <h3>Already have Account</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
          ex ratione. Aliquid!
        </p>
        <button className="btn transparent" id="sign">
          Log in
        </button>
      </div>
     
    </div>
   
  </div>
  &nbsp;&nbsp;&nbsp;&nbsp;</div>

</Layout>
  )
}

export default Login


