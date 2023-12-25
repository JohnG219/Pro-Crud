import React from "react";
import "./Userprofile.css";

const UserProfile = ({ user, onClose }) => {

  return (
    <div className="profile-modal">
      <div className="profile-content">
        {/* Display user details */}
        <h2>{user.name}'s Profile</h2>
        <p>Phone: {user.phone}</p>
        <p>Country: {user.country}</p>
        <p>Gender: {user.sex}</p>
        <button className="btnuserprofile" onClick={onClose}>Exit</button>
      </div>
    </div>
  );
};

export default UserProfile;
