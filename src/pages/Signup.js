import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

 
const Signup = () => {
 const navigate = useNavigate();
 const location = useLocation();
 
 // As explained in the Login page.
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 // As explained in the Login page.
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/", { state: {email: email, password: password}});
 }
 
 // As explained in the Login page.
 const onSubmit = async () => {
   try {


   //  const user = 
    //  if (user) {
    //    redirectNow();
    //  }
   } catch (error) {
     alert(error);
   }
 };
 
 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
   <h1>Signup</h1>
   <TextField
     label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={email}
     onInput={(e) => setEmail(e.target.value)}
     style={{ marginBottom: "1rem" }}
   />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={password}
     onInput={(e) => setPassword(e.target.value)}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Signup
   </Button>
   <p>Have an account already? <Link to="/login">Login</Link></p>
 </form>
}
 
export default Signup;