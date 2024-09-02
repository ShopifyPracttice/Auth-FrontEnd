import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import LoginButton from './pages/login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

function AppRoutes() {
  const [facebookData, setFacebookData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const query = new URLSearchParams(location.search);
  const error = query.get('error');
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '3776103455936524',  // Replace with your Facebook App ID
        cookie     : true,           
        xfbml      : true,           
        version    : 'v20.0'         
      });
    };

    // Load the SDK
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);
  // useEffect(() => {
  //   if (error === "access_denied") {
  //     navigate("/login");
  //   } else if (path === "/auth/google/callback") {
  //     // Redirect to /dashboard for the specific callback path
  //     navigate("/dashboard");
  //   }
  // }, [error, path, navigate]);

  return (
    <Routes>
      <Route path='/login' element={<LoginButton setFacebookData={setFacebookData}/>} />
      <Route path='/dashboard' element={<Dashboard facebookData={facebookData}/>} />
    </Routes>
  );
}

export default App;
