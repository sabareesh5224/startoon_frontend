import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email'); // Get email from URL query params

        if (email) {
          const response = await axios.get('https://st-hbkn.onrender.com/profile', {
            params: { email }, // Correctly pass as an object
          });
          setUserDetails(response.data);
        } else {
          console.error("Email is not provided in URL");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchData();
  }, []);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{userDetails.name || 'N/A'}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userDetails.email || 'N/A'}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{userDetails.gender || 'N/A'}</td>
          </tr>
          <tr>
            <td>Last Login</td>
            <td>{userDetails.lastLoginDate ? new Date(userDetails.lastLoginDate).toLocaleString() : 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
