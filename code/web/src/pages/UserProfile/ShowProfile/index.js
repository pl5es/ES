import React from "react";

const ShowProfile = ({values, setEditProfile}) => (
  <div>
    <button onClick={setEditProfile}>Edit Profile</button>
    <div className="basic-info">
      <img src={values.photo_url} alt="" />
      <div className="text-info">
        <h2>{values.name}</h2>
        <h3>{values.orcid}</h3>
        <h3>{values.institute}</h3>
        <h3>{values.research_area}</h3>
      </div>
    </div>
    <div className="follow">
      <h4>Following</h4>
      <h4>{values.following}</h4>
      <h4>Followers</h4>
      <h4>{values.followers}</h4>
      <h4>Articles</h4>
      <h4>{values.articles}</h4>
    </div>
    <h4>{values.bio}</h4>
  </div>
);

export default ShowProfile;
