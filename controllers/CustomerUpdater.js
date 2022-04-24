/**
 * Class to update a Customer.
 * Used in the Put /customers/[email] endpoint.
 * 
 */

const CustomerList = require('../controllers/CustomerSaver.js');

var customersData = new CustomerList().getInstance();

module.exports = class CustomerUpdater {
 
    static updateCustomer(req, res) {

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
            var customerSearchedIndex = customersData.customersList.findIndex(customer => {
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
            customersData.customersList[customerSearchedIndex].name = newName;
            customersData.customersList[customerSearchedIndex].surname = newSurname;
            customersData.customersList[customerSearchedIndex].email = newEmail;
            customersData.customersList[customerSearchedIndex].birthdate = newBirthdate;

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

    }
 
}
 