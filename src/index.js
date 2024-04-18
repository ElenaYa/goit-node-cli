const contacts = require("./contacts");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
      

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
      

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
      

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
      

    default:
      return console.log("\x1B[31m Unknown action type!");
  }
}
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();

invokeAction(options);