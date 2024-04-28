exports = async function ({ query, headers, body }, response) {
    const contentType = headers["Content-Type"];

    const { incidentId } = query;

    const serviceName = "mongodb-atlas";
    const dbName = "crime";
    const collectionName = "incident";

    const collection = context.services.get(serviceName).db(dbName).collection(collectionName);

    try {
        await collection.deleteOne({ '_id': BSON.ObjectId(incidentId) });
    } catch (err) {
        console.log("Error occurred while executing deleteById:", err.message);
        return { status: 'ERROR', error: err.message };
    }

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return { status: 'OK', message: 'Incident report deleted' };
};