import React, { useState, useEffect } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import User from './User';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users. Please try again later.');
      setLoading(false);
    }
  };

  const handleUserCreated = newUser => {
    setUsers([...users, newUser]);
  };

  const handleUserUpdated = updatedUser => {
    const updatedUsers = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleUserDeleted = userId => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEditUser = user => {
    setEditingUser(user);
  };

  return (
    <div className="App">
      <h1>To-Do List App</h1>
      <CreateUser onUserCreated={handleUserCreated} />
      {editingUser ? (
        <EditUser user={editingUser} onUpdateUser={handleUserUpdated} onCancel={() => setEditingUser(null)} />
      ) : null}
      <h2>Users</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      <ul>
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            onDeleteUser={handleUserDeleted}
            onEditUser={handleEditUser}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
