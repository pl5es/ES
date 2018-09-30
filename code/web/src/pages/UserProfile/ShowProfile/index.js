import React from "react";

const ShowProfile = ({ values, setEditProfile }) => (
  <div>
    <button onClick={setEditProfile}>Edit Profile</button>
    <div className="profile">
      <img src={values.photo_url} alt="" />

      <div className="text-info">
        <h1 className="info-nome">{values.name}</h1>
        <h3 className="info-orcid">
          {values.orcid}
          <span className="span-orcid"> ORCID ID</span>
        </h3>
        <h3 className="info-institute">{values.institute}</h3>
        <h3 className="info-area">{values.research_area}</h3>
      </div>

      <div className="follow">
        <h3>Following</h3>
        <h4>{values.following}</h4>
        <h3>Followers</h3>
        <h4>{values.followers}</h4>
        <h3>Articles</h3>
        <h4>{values.articles}</h4>
      </div>
    </div>
    <h4 className="bio-text">{values.bio}</h4>
  </div>
);

export default ShowProfile;
