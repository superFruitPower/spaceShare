const Promise = require('bluebird');

const { getUserIdByFbId } = require('./userHelpers');
const { getUserByFbId } = require('./userHelpers');
const { UserSpace } = require('../models/user_spaceModel');
const { getDashboardInfoById } = require('./spaceHelpers');

const { Space } = require('../models/spaceModel');
const { User } = require('../models/userModel');


// get all members of space
const getSpaceMembers = spaceId => (
  UserSpace.findAll({ where: { spaceId: spaceId } })
  .then(userSpaces => Promise.map(userSpaces, userSpace => User.findById(userSpace.userId)))
  .then(users => users.map(user => (
    {
      name_last: user.name_last,
      name_first: user.name_first,
      phone: user.phone,
      email: user.email,
      main_image: user.main_image,
      fb_id: user.fb_id,
      fb_link: user.fb_link,
      id: user.id,
    }
  )))
  .catch(err => console.log(err))
);

// get all spaces of a user
const getSpacesByFbId = fbId => (
  getUserIdByFbId(fbId)
    .then(userId => UserSpace.findAll({ where: { userId: userId } }))
    .then(userSpaces => Promise.map(userSpaces, userSpace => getDashboardInfoById(userSpace.spaceId)))
    .catch(err => console.log(err))
);

// takes fb id, returns full user data including space info
const getUserIncludingSpaces = (fbId) => {
  return getUserByFbId(fbId)
    .then(async (user) => {
      user.spaces = await getSpacesByFbId(user.fb_id);
      return user
    })
    .catch(err => console.log(err))
};

// takes space id, returns full space data including members
const getSpaceIncludingMembers = (spaceId) => (
  getSpaceById()
    .then(async (space) => {
      space.members = await getSpaceMembers(space.id);
      return space;
    })
    .catch(err => console.log(err))
);

// get user Fb ids of space

// add users to spaces:
const addUsersToSpaces = (fbId, spaceId) => {
  return User.findOne({ where: { fb_id: fbId } })
  .then(user => UserSpace.create({spaceId: spaceId, userId: user.id}))
  .then(junction => junction.dataValues)
  .catch(err => console.log(err));
}

exports.addUsersToSpaces = addUsersToSpaces;
exports.getSpacesByFbId = getSpacesByFbId;
exports.getSpaceMembers = getSpaceMembers;
exports.getUserIncludingSpaces = getUserIncludingSpaces;
