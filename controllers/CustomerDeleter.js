/**
 * Class to remove a Customer.
 * Used in the Delete /customers/[email] endpoint.
 * 
 */

const CustomerList = require('../controllers/CustomerSaver.js');

var customersData = new CustomerList().getInstance();

module.exports = class CustomerDeleter {

    static deleteCustomer(req, res) {

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

            // Checked if the Customers List Data is empty
            if(!customersData.customersList.length)
                return res.send({
                    Result: 'Error',
                    Message: 'No Customers currently stored.'
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

            // Remove the requested Customer
            customersData.customersList.splice(customerSearchedIndex, 1);

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

    }

}
