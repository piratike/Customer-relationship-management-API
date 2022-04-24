/**
 * Class for save the Customer data for the App.
 * Used by all the other controllers.
 * 
 */

class CustomerSaver {

    constructor() {

        this.customersList = [];

    }

}

module.exports = class Singleton {

    constructor() {

        if(!Singleton.instance)
            Singleton.instance = new CustomerSaver();

    }

    getInstance() {

        return Singleton.instance;

    }

}
