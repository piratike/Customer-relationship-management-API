/**
 * Main file for the API.
 * Modules importations and app initialization.
 * 
 */

const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

var customersList = [];

/* Customer model with needed properties */
class Customer {

    constructor(name, surname, email, birthdate) {

        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthdate = birthdate;

    }

}

/**
 * /customers
 * 
 * Endpoints for general operations:
 * - Post (Creates a new Customer)
 * - Get (Returns all the Customers)
 */
app.route('/customers')
    .post(function(req, res) {

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

    })
    .get(function(req, res) {

        try {

            /**
             * Returns the list of Customers as a String.
             */

            return res.send({
                Result: 'Success',
                Message: 'Customers listed.',
                Data: JSON.stringify(customersList)
            });

        } catch {

            return res.send({
                Result: 'Error',
                Message: 'Something went wrong, please try again.'
            });

        }

    })

app.route('/customers/:customerEmail')
    .get(function(req, res) {

        try {

            /**
             * For get a specific Customer is needed the Email.
             */
            const searchedCustomerEmail = req.params.customerEmail;

            if(!searchedCustomerEmail)
                return res.send({
                    Result: 'Error',
                    Message: 'Email is needed but not provided.'
                });

            // Search and return the requested Customer
            const customerSearched = customersList.find(customer => {
                return customer.email == searchedCustomerEmail;
            });

            return res.send({
                Result: 'Success',
                Message: 'Customers listed.',
                Data: JSON.stringify(customerSearched)
            });

        } catch {

            return res.send({
                Result: 'Error',
                Message: 'Something went wrong, please try again.'
            });

        }

    })
    .put(function(req, res) {

        try {

            /**
             * For update a Customer is needed all the properties, new or not. It's important the Email.
             */

            const searchedCustomerEmail = req.params.customerEmail;
            const newName = req.body.name;
            const newSurname = req.body.surname;
            const newEmail = req.body.email;
            const newBirthdate = req.body.birthdate;

            if(!searchedCustomerEmail)
                return res.send({
                    Result: 'Error',
                    Message: 'Email is needed but not provided.'
                });

            // Checked if a Customer with the Email given exists
            var customerSearchedIndex = customersList.findIndex(customer => {
                return customer.email == searchedCustomerEmail;
            });

            if(customerSearchedIndex == -1)
                return res.send({
                    Result: 'Error',
                    Message: 'Customer doesn\'t exists.'
                });

            // Checked if some property is not given
            if(!newName || !newSurname || !newEmail || !newBirthdate)
                return res.send({
                    Result: 'Error',
                    Message: 'Some needed data is missing.'
                });

            // Update the properties for the requested Customer
            customersList[customerSearchedIndex].name = newName;
            customersList[customerSearchedIndex].surname = newSurname;
            customersList[customerSearchedIndex].email = newEmail;
            customersList[customerSearchedIndex].birthdate = newBirthdate;

            return res.send({
                Result: 'Success',
                Message: 'Customer updated.'
            });

        } catch {

            return res.send({
                Result: 'Error',
                Message: 'Something went wrong, please try again.'
            });

        }

    })
    .delete(function(req, res) {

        try {

            /**
             * For delete a Customer is needed the Email.
             */

            const searchedCustomerEmail = req.params.customerEmail;

            if(!searchedCustomerEmail)
                return res.send({
                    Result: 'Error',
                    Message: 'Email is needed but not provided.'
                });

            // Checked if a Customer with the Email given exists
            var customerSearchedIndex = customersList.findIndex(customer => {
                return customer.email == searchedCustomerEmail;
            });

            if(customerSearchedIndex == -1)
                return res.send({
                    Result: 'Error',
                    Message: 'Customer doesn\'t exists.'
                });

            // Remove the requested Customer
            delete customersList[customerSearchedIndex];

            return res.send({
                Result: 'Success',
                Message: 'Customer Removed.',
            });

        } catch {

            return res.send({
                Result: 'Error',
                Message: 'Something went wrong, please try again.'
            });

        }

    })

app.listen(3000);
