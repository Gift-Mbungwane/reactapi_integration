import {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./App";
import { useEffect } from "react";
import $ from "jquery";

function Navigator() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      $.ajaxSetup({
        headers: { 'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979' }
      });
      // $.ajax({
      //   url: 'https://api.up2tom.com/v3/models',
      //   headers: { 'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979' },
      //   contentType: 'application/vnd.api+json'
      // }).then((data) => {

      //     console.log(data, 'data from app.js')
      // }).catch((error) => console.log(error, 'could not verify user'));    
    }
    fetchUser();
  }, [])

 return (
   <BrowserRouter>
     {/* We are wrapping our whole app with UserProvider so that */}
     {/* our user is accessible through out the app from any page*/}
     
       <Routes>
         <Route exact path="/App" element={<App/>}/>
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/signup" element={<Signup />} />
         {/* We are protecting our Home Page from unauthenticated */}
         {/* users by wrapping it with PrivateRoute here. */}
         {/* <Route element={<PrivateRoute />}>
           <Route exact path="/" element={<Home />} />
         </Route> */}
       </Routes>
     
   </BrowserRouter>
 );
}
 
export default Navigator;