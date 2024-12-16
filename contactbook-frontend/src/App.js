import React, { useState} from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Modal from './components/Modal'; 

function App() {
  const [isContactFormModalOpen, setIsContactFormModalOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const toggleContactFormModal = () => setIsContactFormModalOpen(!isContactFormModalOpen);

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <h1>WELCOME TO CONTACT BOOK APP</h1>
            <ul>
              <li>
                <button className="contact-button">
                  <Link to="/contact-list" className="button-link">Contact List</Link> 
                </button>
              </li>
              <li>
                <button className="contact-button" onClick={toggleContactFormModal}>Contact Form</button>
              </li>
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search contacts by name or phone number..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <Routes>
            <Route path="/contact-list" element={<ContactList searchQuery={searchQuery} pageSize={10} />} />
          </Routes>

          <Modal show={isContactFormModalOpen} onClose={toggleContactFormModal}>
            <ContactForm />
          </Modal>
        </header>
      </div>
    </Router>
  );
}

export default App;
