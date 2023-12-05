import React, { useState } from 'react';

function CreateUser({ onUserCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      phone,
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      onUserCreated(data);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="CreateUser">
      <h2>Create User</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUser;
