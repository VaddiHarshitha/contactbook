import API from "../utils/api"; 
import {useState,useEffect} from 'react';

const ContactList = ({ searchQuery, pageSize }) => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    fetchContacts(); // Fetch the contacts when the component mounts
  }, []);

  const fetchContacts = () => {
    API.get("contacts/") 
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    `${contact.first_name} ${contact.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    contact.phone_number.includes(searchQuery)
  );

  // Sort contacts based on sortOrder
  const sortedContacts = filteredContacts.sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`;
    const fullNameB = `${b.first_name} ${b.last_name}`;

    if (sortOrder === 'asc') {
      return fullNameA.localeCompare(fullNameB);
    } else {
      return fullNameB.localeCompare(fullNameA);
    }
  });

  // Calculate pagination
  const totalContacts = sortedContacts.length;
  const totalPages = Math.ceil(totalContacts / pageSize);
  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle sorting order when button is clicked
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="contact-list-container">
      <h2 className="contact-list-header">Contact List</h2>
      
      {/* Sorting Button */}
      <button onClick={toggleSortOrder} className="sort-button">
        Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      <ul className="contact-list">
        {paginatedContacts.map((contact) => (
          <li key={contact.id}>
            {contact.first_name} {contact.last_name} ({contact.phone_number})
          </li>
        ))}
      </ul>
      {paginatedContacts.length === 0 && <p>No contacts found.</p>}
 
      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactList;

