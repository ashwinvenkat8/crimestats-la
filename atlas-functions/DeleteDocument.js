exports = async function ({ query, headers, body }, response) {
    const contentType = headers["Content-Type"];

    const { type, id } = query;

    const serviceName = "mongodb-atlas";
    const dbName = "crime";

    const collection = context.services.get(serviceName).db(dbName).collection(type);

    try {
        await collection.deleteOne({ '_id': BSON.ObjectId(id) });
    } catch (err) {
        console.log(`Error occurred while executing deleteOne on ${type}: ${err.message}`);
        return { error: err.message };
    }

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return { result: 'Document deleted successfully' };
};