
import React, { useState, useEffect } from "react";
import API from "../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal";

const ContactList = ({ searchQuery, pageSize }) => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [deleteContactName, setDeleteContactName] = useState("");
  const [editContact, setEditContact] = useState(null); // Track the contact being edited

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    API.get("contacts/")
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  const handleDelete = (id) => {
    API.delete(`contacts/${id}`)
      .then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
        setShowDeleteModal(false);
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  const openDeleteModal = (id, name) => {
    setDeleteContactId(id);
    setDeleteContactName(name);
    setShowDeleteModal(true);
  };

  const handleEditContact = (contact) => {
    setEditContact({ ...contact });
  };

  const saveEditedContact = () => {
    API.put(`contacts/${editContact.id}`, editContact)
      .then((response) => {
        setContacts(
          contacts.map((contact) =>
            contact.id === response.data.id ? response.data : contact
          )
        );
        setEditContact(null);
      })
      .catch((error) => console.error("Error editing contact:", error));
  };

  const filteredContacts = contacts.filter((contact) =>
    `${contact.first_name} ${contact.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    contact.phone_number.includes(searchQuery)
  );

  const sortedContacts = filteredContacts.sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`;
    const fullNameB = `${b.first_name} ${b.last_name}`;
    return sortOrder === "asc"
      ? fullNameA.localeCompare(fullNameB)
      : fullNameB.localeCompare(fullNameA);
  });

  const totalContacts = sortedContacts.length;
  const totalPages = Math.ceil(totalContacts / pageSize);
  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="contact-list-container">
      <h2 className="contact-list-header">Contact List</h2>
      <button onClick={toggleSortOrder} className="sort-button">
        Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      <ul className="contact-list">
        {paginatedContacts.map((contact) => (
          <li key={contact.id}>
            {editContact && editContact.id === contact.id ? (
              <>
                <input
                  type="text"
                  value={editContact.first_name}
                  onChange={(e) =>
                    setEditContact({ ...editContact, first_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editContact.last_name}
                  onChange={(e) =>
                    setEditContact({ ...editContact, last_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editContact.phone_number}
                  onChange={(e) =>
                    setEditContact({ ...editContact, phone_number: e.target.value })
                  }
                />
                <button onClick={saveEditedContact}>Save</button>
                <button onClick={() => setEditContact(null)}>Cancel</button>
              </>
            ) : (
              <>
                {contact.first_name} {contact.last_name} ({contact.phone_number})
                <button onClick={() => handleEditContact(contact)}>Edit</button>
                <button
                  onClick={() => openDeleteModal(contact.id, contact.first_name)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {paginatedContacts.length === 0 && <p>No contacts found.</p>}

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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => handleDelete(deleteContactId)}
        contactName={deleteContactName}
      />
    </div>
  );
};

export default ContactList;
