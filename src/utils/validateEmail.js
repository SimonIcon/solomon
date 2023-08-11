// email validation function
function isValidEmail(e) {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
}

export default isValidEmail