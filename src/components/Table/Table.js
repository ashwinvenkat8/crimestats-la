import './Table.css';

export default function Table({ data }) {
    data = [];

    for (let i = 0; i < 10; i++) {
        data.push({
            dr_no: '123456',
            date_rptd: '2021-01-01',
            date_occ: '2021-01-01',
            time_occ: '12:00',
            status: 'Open',
            crime: 'Robbery',
            premise: 'Residence',
            weapon: 'Handgun',
            modus_operandi: 'Threatened victim with a gun',
            location: '1234 Main St',
            victim: 'John Doe'
        });
    };

    return (
        <div className="table-container">
            {
                data ? ( 
                    <table className="incidents-table">
                        <thead>
                            <tr>
                                <th>Dr No</th>
                                <th>Date Reported</th>
                                <th>Date Occurred</th>
                                <th>Time Occurred</th>
                                <th>Crime</th>
                                <th>Status</th>
                                {/* <th>Premise</th>
                                <th>Weapon</th>
                                <th>MO</th>
                                <th>Location</th>
                                <th>Victim</th> */}
                                <th className="col-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((incident, index) => (
                                    <tr key={index}>
                                        <td>{incident.dr_no}</td>
                                        <td>{incident.date_rptd}</td>
                                        <td>{incident.date_occ}</td>
                                        <td>{incident.time_occ}</td>
                                        <td>{incident.crime}</td>
                                        <td>{incident.status}</td>
                                        {/* <td>{incident.premise}</td>
                                        <td>{incident.weapon}</td>
                                        <td>{incident.modus_operandi}</td>
                                        <td>{incident.location}</td>
                                        <td>{incident.victim}</td> */}
                                        <td className="col-action">
                                            <center>
                                                <button className="action-button update">Update</button>
                                                <button className="action-button delete">Delete</button>
                                            </center>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p>No incident records found</p>
                )
            }
        </div>
    );
}