import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = ({route}) => {
 const navigate = useNavigate();
 const location = useLocation();
 const {state} = useLocation();

 const {emails, passwords} = state;

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 
 // This function will redirect the user to the
 // appropriate page once the authentication is done.
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/",  { state:{}});
 }
 
 // Once a user logs in to our app, we don’t want to ask them for their
 // credentials again every time the user refreshes or revisits our app, 
 // so we are checking if the user is already logged in and
 // if so we are redirecting the user to the home page.
 // Otherwise we will do nothing and let the user to login.
 const loadUser = async () => {
//    if (!user) {
//      const fetchedUser = await fetchUser();
//      if (fetchedUser) {
//        // Redirecting them once fetched.
//        redirectNow();
//      }
//    }
 }

 
 // This useEffect will run only once when the component is mounted.
 // Hence this is helping us in verifying whether the user is already logged in
 // or not.
 useEffect(() => {
  // loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
 
 // This function gets fired when the user clicks on the "Login" button.
 const onSubmit = async (event) => {
   try {
     // Here we are passing user details to our emailPasswordLogin
     // function that we imported from our 
    //   if () {
    //     redirectNow();
    //   }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
      } else {
          alert(error);
      }
 
   }
 };
 
 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
   <h1>Login</h1>
   <TextField
     label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={email}
     onChange={(email) => setEmail(email.target.value)}
     style={{ marginBottom: "1rem" }}
   />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={password}
     onChange={(password) => setPassword(password.target.value)}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Login
   </Button>
   <p>Don't have an account? <Link to="/signup">Signup</Link></p>
 </form>
}
 
export default Login;