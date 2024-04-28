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
        const updatedAreaDoc = await areaColl.updateOne({
            '_id': reqBody['area']['_id']
        }, {
            'area': reqBody['area']['area'],
            'area_name': reqBody['area']['areaName']
        });

        const updatedMODoc = await modusOperandiColl.updateOne({
            '_id': reqBody['modusOperandi']['_id']
        }, {
            'code': reqBody['modusOperandi']['code'],
            'desc': reqBody['modusOperandi']['desc']
        });

        const updatedCrimeDoc = await crimeColl.updateOne({
            '_id': reqBody['crime']['_id']
        }, {
            'code': reqBody['crime']['code'],
            'desc': reqBody['crime']['desc']
        });

        const updatedPremiseDoc = await premiseColl.updateOne({
            '_id': reqBody['premise']['_id']
        }, {
            'code': reqBody['premise']['code'],
            'desc': reqBody['premise']['desc']
        });

        const updatedWeaponDoc = await weaponColl.updateOne({
            '_id': reqBody['weapon']['_id']
        }, {
            'code': reqBody['weapon']['code'],
            'desc': reqBody['weapon']['desc']
        });

        const updatedStatusDoc = await statusColl.updateOne({
            '_id': reqBody['status']['_id']
        }, {
            'code': reqBody['status']['code'],
            'desc': reqBody['status']['desc']
        });

        const updatedLocationDoc = await locationColl.updateOne({
            '_id': reqBody['location']['_id']
        }, {
            'location': reqBody['location']['location'],
            'cross_street': reqBody['location']['crossStreet'],
            'lat': reqBody['location']['lat'],
            'lon': reqBody['location']['lon'],
            'area': reqBody['location']['area']
        });

        const updatedVictimDoc = await victimColl.updateOne({
            '_id': reqBody['victim']['_id']
        }, {
            'age': reqBody['victim']['age'],
            'sex': reqBody['victim']['sex'],
            'descent': reqBody['victim']['descent']
        });

        updatedIncidentDoc = await incidentColl.updateOne({
            '_id': reqBody['incident']['_id']
        }, {
            'dr_no': reqBody['incident']['drNo'],
            'date_rptd': reqBody['incident']['dateRptd'],
            'date_occ': reqBody['incident']['dateOcc'],
            'time_occ': reqBody['incident']['timeOcc'],
            'status': [reqBody['status']['_id']],
            'crime': [reqBody['crime']['_id']],
            'premise': [reqBody['premise']['_id']],
            'weapon': [reqBody['weapon']['_id']],
            'modus_operandi': [reqBody['modusOperandi']['_id']],
            'location': reqBody['location']['_id'],
            'victim': reqBody['victim']['_id']
        });
    } catch (err) {
        console.log("Error occurred while executing updateOne:", err.message);
        return { status: 'ERROR', error: err.message };
    }

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return { status: 'OK', message: 'Incident updated successfully' };
};