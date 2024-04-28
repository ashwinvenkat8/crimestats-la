exports = async function (arg) {
    const serviceName = "mongodb-atlas";
    const dbName = "crime";
    const collName = "incident";

    const collection = context.services.get(serviceName).db(dbName).collection(collName);

    const pipeline = [
        { $lookup: { from: 'modus_operandi', localField: 'modus_operandi', foreignField: '_id', as: 'modus_operandi' } },
        { $lookup: { from: 'crime', localField: 'crime', foreignField: '_id', as: 'crime' } },
        { $lookup: { from: 'premise', localField: 'premise', foreignField: '_id', as: 'premise' } },
        { $lookup: { from: 'weapon', localField: 'weapon', foreignField: '_id', as: 'weapon' } },
        { $lookup: { from: 'location', localField: 'location', foreignField: '_id', as: 'location' } },
        { $lookup: { from: 'area', localField: 'location.area', foreignField: '_id', as: 'area' } },
        { $lookup: { from: 'victim', localField: 'victim', foreignField: '_id', as: 'victim' } },
        { $lookup: { from: 'status', localField: 'status', foreignField: '_id', as: 'status' } },
        { $unwind: { path: '$status' } },
        { $unwind: { path: '$crime' } },
        { $unwind: { path: '$premise' } },
        { $unwind: { path: '$weapon' } },
        { $unwind: { path: '$modus_operandi' } },
        { $unwind: { path: '$location' } },
        { $unwind: { path: '$area' } },
        { $unwind: { path: '$victim' } },
        { $project: { _id: 0, 'status._id': 0, 'crime._id': 0, 'premise._id': 0, 'weapon._id': 0, 'modus_operandi._id': 0, 'location.area': 0, 'location._id': 0, 'area._id': 0, 'victim._id': 0 } },
        { $group: { _id: "$area.area_name", count: { $sum: 1 } } },
        { $project: { _id: 1, count: 1 } },
        { $limit: 5 }
    ];

    let aggregatedResult;

    try {
        aggregatedResult = await collection.aggregate(pipeline, { maxTimeMS: 60000, allowDiskUse: true });
    } catch (err) {
        console.log("Error occurred while executing aggregate:", err.message);
        return { error: err.message };
    }

    return aggregatedResult;
};