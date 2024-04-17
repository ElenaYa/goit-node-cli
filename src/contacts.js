// contacts.js
const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');


 const contactsPath = path.join(__dirname, 'contacts.json');


async function listContacts() {
    // ...твій код. Повертає масив контактів.
        const data = await fs.readFile(contactsPath, 'utf-8');
    
        return JSON.parse(data);
  }
  
  async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
   
        const contacts = await listContacts();
        const result = contacts.find(item => item.id === contactId);
        return result || null;
  }
  
  async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
  async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };