import React, { useState, useEffect } from 'react';

function EditUser({ user, onUpdateUser, onCancel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = async event => {
    event.preventDefault();

    const updatedUser = {
      id: user.id,
      name,
      email,
      phone,
    };

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      onUpdateUser(data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  return (
    <div className="EditUser">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        </label>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditUser;
