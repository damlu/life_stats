
let isValidDate = (d) => {
    return Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d);
};



export { isValidDate };