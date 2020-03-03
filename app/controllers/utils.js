'use strict';
const utils = {
     isAdmin(scope) {
         if (scope == 'admin') {
             return true;
         }
         return false;
     },
    notAdmin(scope) {
        if (scope == 'admin') {
            return false;
        }
        return true;
    }
};

module.exports = utils;