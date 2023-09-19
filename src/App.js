import React, { useState } from 'react';

import ContactList from './components/ContactList';
import AddContactForm from './components/AddContactForm';
// Notification 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (newContact) => {
    // Add the new contact to the local state.
    setContacts([...contacts, newContact]);
  };

  return (
    <div className="App w-full flex flex-col text-center">
      <h1 className='font-extrabold text-2xl p-3 text-red-700'>React Contact List App</h1>
      <AddContactForm onAddContact={handleAddContact} />
      <ContactList contacts={contacts} setContacts={setContacts} />

      <ToastContainer position="top-right"
        autoClose={500}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={true}
      />
    </div>
  );
}

export default App;
