import React, { useState } from 'react';

export default function Component() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newContact = {
      id: Math.random().toString(36).substring(7),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    if (editingContact) {
      setContacts(contacts.map(c => (c.id === editingContact.id ? newContact : c)));
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

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Address Book</h1>

      <div className="grid gap-6 md:grid-cols-[1fr,2fr]">
        {/* Add New Contact Form */}
        <div className="border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-green-500">+</span> Add New Contact
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Enter name"
                defaultValue={editingContact?.name || ''}
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter email"
                defaultValue={editingContact?.email || ''}
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Enter phone number"
                defaultValue={editingContact?.phone || ''}
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </form>
        </div>

        {/* Contact List */}
        <div className="space-y-6">
          <div className="border rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-blue-500">👤</span> Contact List
            </h2>
            <div className="relative mt-4">
              <input
                placeholder="Search contacts..."
                className="w-full border rounded p-2 pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            </div>
            <div className="mt-4 space-y-4">
              {filteredContacts.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No contacts found</p>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border rounded p-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-medium">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-yellow-500"
                        onClick={() => setEditingContact(contact)}
                      >
                        ✏️
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() =>
                          setContacts(contacts.filter((c) => c.id !== contact.id))
                        }
                      >
                        🗑️
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
  );
}
