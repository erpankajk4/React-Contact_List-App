import React, { useState } from 'react';

function ContactItem({ contact, onDelete, onUpdate }) {
  const { id, name, email, phone } = contact;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({ ...contact });

  const handleDelete = () => {
    // Call the onDelete function from ContactList Component to initiate the delete action.
    onDelete(id);
  };

  const handleUpdate = () => {
    // Call the onUpdate function from ContactList Component to initiate the update action.
    onUpdate(updatedContact);
    setIsEditing(false); // Exit edit mode after updating.
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact({ ...updatedContact, [name]: value });
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md p-4 mb-4 mr-4">
    <div>
      <strong className="text-lg mb-2">{name}</strong>
    </div>
    <div className="text-gray-600 mb-2">Email: {email}</div>
    <div className="text-gray-600 mb-2">Phone: {phone}</div>
    {isEditing ? (
      <div>
        {/* Edit mode */}
        <input
          className="border rounded-md p-2 mb-2"
          type="text"
          name="name"
          value={updatedContact.name}
          onChange={handleInputChange}
        />
        <input
          className="border rounded-md p-2 mb-2"
          type="text"
          name="email"
          value={updatedContact.email}
          onChange={handleInputChange}
        />
        <input
          className="border rounded-md p-2 mb-2"
          type="text"
          name="phone"
          value={updatedContact.phone}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleUpdate}
        >
          Save
        </button>
      </div>
    ) : (
      <div>
        <button
          className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded-md"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    )}
  </div>
  );
}

export default ContactItem;
