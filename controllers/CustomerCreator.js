/**
 * Class to create a new Customer.
 * Used in the Post /customers endpoint.
 * 
 */

const Customer = require('../models/Customer.js');
const CustomerList = require('../controllers/CustomerSaver.js');

var customersList = new CustomerList().getInstance();

module.exports = class CustomerCreator {

    static createNewCustomer(req, res) {

        try {

            /**
             * For a new Customer is needed:
             * - Name
             * - Surname
             * - Email (main property)
             * - Birthdate
             */

            const newName = req.body.name;
            const newSurname = req.body.surname;
            const newEmail = req.body.email;
            const newBirthdate = req.body.birthdate;

            // Checked if some property is not given
            if(!newName || !newSurname || !newEmail || !newBirthdate)
                return res.send({
                    Result: 'Error',
                    Message: 'Some needed data is missing.'
                });

            // Checked if a Customer with the Email given already exists
            const customerExists = customersList.find(customer => {
                return customer.email == newEmail;
            });

            if(customerExists) 
                return res.send({
                    Result: 'Error',
                    Message: 'A Customer with that email already exists.'
                });

            // Creates the Customer and added to the array of Customers
            const newCustomer = new Customer(
                newName,
                newSurname,
                newEmail,
                newBirthdate
            );

            customersList.push(newCustomer);

            return res.send({
                Result: 'Success',
                Message: 'Customer created succesfully.'
            });

        } catch {

            return res.send({
                Result: 'Error',
                Message: 'Something went wrong, please try again.'
            });

        }

    }

}
