import React, { useState, useEffect } from "react";
import {  PersonAdd, Search, Edit, Delete, Clear } from "@mui/icons-material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
export default function Component() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newContact = {
      id: Math.random().toString(36).substring(7),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    if (editingContact) {
      setContacts(
        contacts.map((c) => (c.id === editingContact.id ? newContact : c))
      );
      setEditingContact(null);
    } else {
      setContacts([...contacts, newContact]);
    }

    e.currentTarget.reset();
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search)
  );

  const handleClearFilter = () => {
    setSearch(""); // Reset the search filter
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}> {/* Apply dark mode class */}
      <div className="container mx-auto p-6 max-w-5xl">
        <h1 contenteditable>
          Address Book
        </h1>
        <div className="flex items-center justify-end space-x-2">
          <span className="text-black dark:text-white"><LightModeIcon /></span>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
          <span className="text-black dark:text-white"><DarkModeIcon /></span>
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr,2fr] xl:grid-cols-[1fr,3fr]">
          {/* Add New Contact Form */}
          <div className="border rounded-lg shadow p-4 max-w-full bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
              <PersonAdd className="text-black dark:text-white" /> Add New Contact
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium dark:text-white">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Enter name"
                  defaultValue={editingContact?.name || ""}
                  className="w-full border rounded p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium dark:text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email"
                  defaultValue={editingContact?.email || ""}
                  className="w-full border rounded p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium dark:text-white">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  defaultValue={editingContact?.phone || ""}
                  className="w-full border rounded p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transform transition-all duration-200 hover:scale-105"
              >
                {editingContact ? "Update Contact" : "Add Contact"}
              </button>
            </form>
          </div>

          {/* Contact List */}
          <div className="space-y-6 max-w-full">
            <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-1 dark:text-white">
                <Search className="text-black dark:text-white" /> Contact List
              </h2>
              <div className="relative mt-4">
                <input
                  placeholder="Search contacts..."
                  className="w-full border rounded p-2 pl-9 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
                {/* Clear Filter Button */}
                {search && (
                  <button
                    onClick={handleClearFilter}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <Clear />
                  </button>
                )}
              </div>
              <div className="mt-4 space-y-4">
                {filteredContacts.length === 0 ? (
                  <p className="text-center text-gray-500 py-4 dark:text-gray-400">
                    No contacts found
                  </p>
                ) : (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="border rounded p-4 flex justify-between items-start bg-gray-100 dark:bg-gray-700 dark:text-white"
                    >
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                        <p className="text-sm text-gray-500">{contact.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        {/* Edit Button */}
                        <button
                          className="flex items-center text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105"
                          onClick={() => setEditingContact(contact)}
                        >
                          <Edit className="mr-1" />
                          Edit
                        </button>
                        {/* Delete Button */}
                        <button
                          className="flex items-center text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105"
                          onClick={() =>
                            setContacts(
                              contacts.filter((c) => c.id !== contact.id)
                            )
                          }
                        >
                          <Delete className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
