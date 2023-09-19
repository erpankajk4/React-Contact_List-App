import React, { useState } from 'react';
// React-Tostify
import { toast } from 'react-toastify';

function AddContactForm({ onAddContact }) {
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    // function to post "POST" request to add contact in API
    const simulatePostRequest = async () => {
        try {
            // Simulate the POST request (dummy call).
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify(newContact),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error("Failed to add contact.");
                throw new Error('Failed to add contact.');
            }else{
                toast.success("Contact added successfully!");
            }

            // Assuming the server returns the newly created contact with an ID.
            const createdContact = await response.json();
            // console.log(createdContact);
            // Return the created contact.
            return createdContact;
        } catch (error) {
            toast.error("Failed to add contact.");
            console.error('Error adding contact:', error);
            throw error;
        }
    };

    // Function to handle Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Simulate the POST request to add the contact.
            const createdContact = await simulatePostRequest();

            // Update the local state with the new contact.
            onAddContact(createdContact);

            // Clear the form fields.
            setNewContact({ name: '', email: '', phone: '' });
        } catch (error) {
            // Handle any errors that may occur during the POST request.
            console.error('Error adding contact:', error);
            toast.error("Error occur during the POST request");
        }
    };

    return (
        <div className="w-full p-2 bg-white rounded-lg shadow-lg sticky top-0">
            {/* Create Contact Form  */}
            <form onSubmit={handleSubmit} className=" contact-form flex gap-2 justify-center text-center">
                <div className='flex justify-center text-center gap-2'>
                    <label className="block text-gray-600 my-auto">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newContact.name}
                        placeholder='Enter your Name'
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className='flex justify-center text-center gap-2'>
                    <label className="block text-gray-600 my-auto">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newContact.email}
                        placeholder='Enter Email Address'
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className='flex justify-center text-center gap-2'>
                    <label className="block text-gray-600 my-auto">Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={newContact.phone}
                        placeholder='Enter phone number'
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Add Contact
                </button>
            </form>
        </div>

    );
}

export default AddContactForm;
