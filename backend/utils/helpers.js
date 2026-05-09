function generateOrderId() {
    let prefix = "ORD-";
    let randomString = Date.now();
    return prefix + randomString; //ORD-1688123456789
}

module.exports = { generateOrderId };