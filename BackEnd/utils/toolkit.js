// exports.isEmpty = (obj) => {
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }
exports.isEmpty = (value) => {
    return Boolean(value && typeof value === 'object') && !Object.keys(value).length;
}