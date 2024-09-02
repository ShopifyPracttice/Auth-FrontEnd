import React, { useEffect, useState } from 'react';

const Dashboard = ({facebookData}) => {
    const [user, setUser] = useState(null);
    console.log(facebookData);
    
    useEffect(() => {
        fetch('http://localhost:3000/api/user', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {facebookData &&(
                <div style={{display: "grid", placeItems: 'center', background: '#385185', height: '100vh', color: "#fff"}}>
                    <div>
                <img src={facebookData.picture.data.url} style={{width: '200px', height:'200px', borderRadius:'50%'}}/>

              <p>  <b>Name:</b> {facebookData.name}</p>
              <p>  <b>Email:</b> {facebookData.email}</p>
                 {/* Last Name: {facebookData.last_name} */}
              <p> <b> Number of Friends: </b> {facebookData.friends.summary.total_count}</p>
                </div>
                </div>
            )}
            {user &&(
                <div style={{display: "grid", placeItems: 'center', background: '#d44040', height: '100vh', color: "#fff"}}>
                    <div>
                <img src={user.picture} style={{width: '200px', height:'200px', borderRadius:'50%'}}/>

              <p>  <b>Name:</b> {user.name}</p>
              <p>  <b>Email:</b> {user.email}</p>
                 {/* Last Name: {facebookData.last_name} */}
              {/* <p> <b> Number of Friends: </b> {facebookData.friends.summary.total_count}</p> */}
                </div>
                </div>
            )}
            {/* <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p> */}
        </div>
    );
};

export default Dashboard;
