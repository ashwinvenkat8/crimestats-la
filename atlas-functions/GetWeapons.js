exports = async function (arg) {
    const serviceName = "mongodb-atlas";
    const dbName = "crime";
    const collName = "weapon";

    const collection = context.services.get(serviceName).db(dbName).collection(collName);

    let findResult;

    try {
        findResult = await collection.find({}, { '_id': 0 });
    } catch (err) {
        console.log("Error occurred while executing find:", err.message);
        return { error: err.message };
    }

    return findResult;
};