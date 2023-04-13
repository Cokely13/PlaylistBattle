import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSingleUser } from '../store/singleUserStore';

function EditProfile({ setShowEdit, user }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { id: user.id, username, password, email, imageUrl };
    dispatch(updateSingleUser(updatedUser));
    setShowEdit(false);
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Profile Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setShowEdit(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
