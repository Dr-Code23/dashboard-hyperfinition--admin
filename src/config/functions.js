/**
 * This function checks if the current user has a permission
 * @param {String} permissionName
 * @return boolean
 * */
function hasPermission(permissionName){

    let permissions = localStorage.getItem('permissions');

    if(isJson(permissions)){
        permissions = JSON.parse(permissions) || [];

        return permissions.includes(permissionName);
    }

    return false;
}

/**
 * Checks if the given string is a valid json
 * @param {string} string
 * @return boolean
 */
const isJson = (string) => {
    try{
        JSON.parse((string))
    }catch{
        return false;
    }

    return true;
};
export default hasPermission;