const { addNewUser } = require('./userHelpers');
const { getUserByFbId } = require('./userHelpers');
const { getUserById } = require('./userHelpers');
const { updateUser } = require('./userHelpers');
const { userInDb } = require('./userHelpers');
const { addGender } = require('./genderHelpers');
const { addNewSearch } = require('./searchHelpers');

exports.addNewUser = addNewUser;
exports.getUserByFbId = getUserByFbId;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.userInDb = userInDb;
exports.addGender = addGender;
exports.addNewSearch = addNewSearch;
