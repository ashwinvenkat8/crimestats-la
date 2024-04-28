exports = async function ({ query, headers, body }, response) {
    const contentType = headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const reqBody = JSON.parse(body.text());

    const serviceName = "mongodb-atlas";
    const dbName = "crime";
    const areaCollName = "area";
    const modusOperandiCollName = "modus_operandi";
    const crimeCollName = "crime";
    const premiseCollName = "premise";
    const weaponCollName = "weapon";
    const statusCollName = "status";
    const locationCollName = "location";
    const victimCollName = "victim";
    const incidentCollName = "incident";

    const crimeDb = context.services.get(serviceName).db(dbName);
    const areaColl = crimeDb.collection(areaCollName);
    const modusOperandiColl = crimeDb.collection(modusOperandiCollName);
    const crimeColl = crimeDb.collection(crimeCollName);
    const premiseColl = crimeDb.collection(premiseCollName);
    const weaponColl = crimeDb.collection(weaponCollName);
    const statusColl = crimeDb.collection(statusCollName);
    const locationColl = crimeDb.collection(locationCollName);
    const victimColl = crimeDb.collection(victimCollName);
    const incidentColl = crimeDb.collection(incidentCollName);

    let savedIncidentDoc;

    try {
        const savedAreaDoc = await areaColl.insertOne({
            'area': reqBody['area']['area'],
            'area_name': reqBody['area']['areaName']
        });

        const savedMODoc = await modusOperandiColl.insertOne({
            'code': reqBody['modusOperandi']['code'],
            'desc': reqBody['modusOperandi']['desc']
        });

        const savedCrimeDoc = await crimeColl.insertOne({
            'code': reqBody['crime']['code'],
            'desc': reqBody['crime']['desc']
        });

        const savedPremiseDoc = await premiseColl.insertOne({
            'code': reqBody['premise']['code'],
            'desc': reqBody['premise']['desc']
        });

        const savedWeaponDoc = await weaponColl.insertOne({
            'code': reqBody['weapon']['code'],
            'desc': reqBody['weapon']['desc']
        });

        const savedStatusDoc = await statusColl.insertOne({
            'code': reqBody['status']['code'],
            'desc': reqBody['status']['desc']
        });

        const savedLocationDoc = await locationColl.insertOne({
            'location': reqBody['location']['location'],
            'cross_street': reqBody['location']['crossStreet'],
            'lat': reqBody['location']['lat'],
            'lon': reqBody['location']['lon'],
            'area': savedAreaDoc.insertedId
        });

        const savedVictimDoc = await victimColl.insertOne({
            'age': reqBody['victim']['age'],
            'sex': reqBody['victim']['sex'],
            'descent': reqBody['victim']['descent']
        });

        savedIncidentDoc = await incidentColl.insertOne({
            'dr_no': reqBody['incident']['drNo'],
            'date_rptd': reqBody['incident']['dateRptd'],
            'date_occ': reqBody['incident']['dateOcc'],
            'time_occ': reqBody['incident']['timeOcc'],
            'status': [savedStatusDoc.insertedId],
            'crime': [savedCrimeDoc.insertedId],
            'premise': [savedPremiseDoc.insertedId],
            'weapon': [savedWeaponDoc.insertedId],
            'modus_operandi': [savedMODoc.insertedId],
            'location': savedLocationDoc.insertedId,
            'victim': savedVictimDoc.insertedId
        });
    } catch (err) {
        console.log("Error occurred while executing insertOne:", err.message);
        return { error: err.message };
    }

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return { result: savedIncidentDoc.insertedId };
};