import React, {  useEffect } from 'react';
import ContactItem from './ContactItem';
// React-Tostify
import { toast } from 'react-toastify';

function ContactList({ contacts, setContacts }) {

  // Fetch DATA from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  // Function to send "DELETE" request to delete a contact
  const handleDeleteContact = async (id) => {
    try {
      // Send a DELETE request to the provided URL to delete the contact (dummy call).
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      // Update the local state to remove the contact.
      setContacts(contacts.filter((contact) => contact.id !== id));
      toast.warn("Contact deleted successfully");
    } catch (error) {
      toast.error("Error deleting contact");
      console.error('Error deleting contact:', error);
    }
  };

    // Function to send "PUT" request to update a contact
  const handleUpdateContact = async (updatedContact) => {
    try {
      // Check if the contact is in the API (dummy call).
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedContact.id}`
      );

      if (!response.ok) {
        // If the contact is not in the API, update it in the local state only.
        setContacts((prevContacts) => {
          return prevContacts.map((contact) => {
            if (contact.id === updatedContact.id) {
              toast.error("Contact updated but it is not in API");
              return updatedContact;
            } else {
              return contact;
            }
          });
        });
      } else {
        // If the contact is in the API, make a PUT request to update it.
        await fetch(`https://jsonplaceholder.typicode.com/users/${updatedContact.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedContact),
        });

        // Update the local state with the updated contact.
        setContacts((prevContacts) => {
          return prevContacts.map((contact) => {
            if (contact.id === updatedContact.id) {
              toast.success("Contact updated");
              return updatedContact;
            } else {
              return contact;
            }
          });
        });
      }
    } catch (error) {
      toast.error("Error updating contact");
      console.error('Error updating contact:', error);
    }
  };


  return (
    <>
      <h1 className='font-extrabold text-2xl p-3 text-gray-600'>
        Contact List
        </h1>
        
      <div className="flex flex-wrap mx-auto">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={handleDeleteContact}
            onUpdate={handleUpdateContact}
          />
        ))}
      </div>
    </>
  );
}

export default ContactList;
