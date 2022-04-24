/**
 * File to declare all enpoints for the App.
 * 
 */

const express = require('express');
const Router = express.Router();
const CustomerCreator = require('../controllers/CustomerCreator.js');
const CustomerLister = require('../controllers/CustomerLister.js');
const CustomerUpdater = require('../controllers/CustomerUpdater.js');
const CustomerDeleter = require('../controllers/CustomerDeleter.js');

Router.post('/customers', CustomerCreator.createNewCustomer);
Router.get('/customers', CustomerLister.listAllCustomers);
Router.get('/customers/:customerEmail', CustomerLister.listCustomer);
Router.put('/customers/:customerEmail', CustomerUpdater.updateCustomer);
Router.delete('/customers/:customerEmail', CustomerDeleter.deleteCustomer);

module.exports = Router;
