import React from 'react';

function User({ user, onDeleteUser, onEditUser }) {
  const handleDelete = async () => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'DELETE',
      });
      onDeleteUser(user.id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="User">
      <p>
        {user.name} - {user.email} - {user.phone}
      </p>
      <button onClick={() => onEditUser(user)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default User;
