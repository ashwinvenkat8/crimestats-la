exports = async function (arg) {
    const serviceName = "mongodb-atlas";
    const dbName = "crime";
    const collName = "incident";

    const collection = context.services.get(serviceName).db(dbName).collection(collName);

    let pipeline = [
        { $sort: { date_rptd: -1 } },
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
        { $project: { 'location.area': 0 } }
    ];

    const queryParams = context.request.rawQueryString;
    const limitMatch = queryParams.match(/limit=[0-9]+/)[0].split('=')[1];
    const skipMatch = queryParams.match(/skip=[0-9]+/)[0].split('=')[1];

    if (queryParams.length > 0 && limitMatch && skipMatch) {
        pipeline.push({ $skip: parseInt(skipMatch) });
        pipeline.push({ $limit: parseInt(limitMatch) });
    }

    let aggregatedResult;

    try {
        aggregatedResult = await collection.aggregate(pipeline, { maxTimeMS: 60000, allowDiskUse: true });
    } catch (err) {
        console.log("Error occurred while executing aggregate:", err.message);
        return { error: err.message };
    }

    return aggregatedResult;
};