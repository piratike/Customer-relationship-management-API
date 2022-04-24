/**
 * Class to list Customers.
 * Used in the Get /customers and /customers/[email] endpoints.
 * 
 */

const CustomerList = require('../controllers/CustomerSaver.js');

var customersList = new CustomerList().getInstance();

module.exports = class CustomerLister {
 
    static listAllCustomers(req, res) {

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

    }
 
    static listCustomer(req, res) {

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

    }

}