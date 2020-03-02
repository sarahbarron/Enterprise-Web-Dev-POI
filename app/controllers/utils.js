'use strict';
const utils = {
     isAdmin(scope) {
         if (scope == 'admin') {
             return true;
         }
         return false;
     }
};

module.exports = utils;