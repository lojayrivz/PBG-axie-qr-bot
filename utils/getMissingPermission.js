const permissionFlags = require('../assets/json/permissionFlags.json')

module.exports.getMissingPermission = (permissions) => {
    return permissions.map(permission => permissionFlags[permission])
}