'use client'

import './DetailView.css';

export default function DetailView({ incident, onClose }) {
  const handleUpdate = () => {
    console.log('Update incident');
  };

  const doDelete = async (incidentId, incidentDrNo) => {
    if(confirm(`Are you sure you want to delete incident ${incidentDrNo}?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/deleteIncident?incidentId=${incidentId}&secret=${process.env.NEXT_PUBLIC_SECRET}`, {
        method: 'DELETE'
      });
      const result = await response.json();

      if(result.status === 'ERROR') {
        alert('The incident could be deleted due to an error. Please try again later.');
        console.error(result.error);
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div className="detail-view">
      <div className="detail-view-content">
        <h2>Incident Details</h2>
        <table>
          {
            incident['dr_no'] ? (
              <tr>
                <th><strong>DR No</strong></th>
                <td>{incident['dr_no']}</td>
              </tr>
            ) : null
          }
          {
            incident['date_rptd'] ? (
              <tr>
                <th><strong>Date Reported</strong></th>
                <td>{incident['date_rptd']}</td>
              </tr>
            ) : null
          }
          {
            incident['date_occ'] ? (
              <tr>
                <th><strong>Date Occurred</strong></th>
                <td>{incident['date_occ']}</td>
              </tr>
            ) : null
          }
          {
            incident['time_occ'] ? (
              <tr>
                <th><strong>Time Occurred</strong></th>
                <td>{incident['time_occ']}</td>
              </tr>
            ) : null
          }
          {
            incident['victim']['age'] ? (
              <tr>
                <th><strong>Victim Age</strong></th>
                <td>{incident['victim']['age']}</td>
              </tr>
            ) : null
          }
          {
            incident['victim']['sex'] ? (
              <tr>
                <th><strong>Victim Sex</strong></th>
                <td>{incident['victim']['sex']}</td>
              </tr>
            ) : null
          }
          {
            incident['victim']['descent'] ? (
              <tr>
                <th><strong>Victim Descent</strong></th>
                <td>{incident['victim']['descent']}</td>
              </tr>
            ) : null
          }
          {
            incident['area']['area_name'] ? (
              <tr>
                <th><strong>Area</strong></th>
                <td>{incident['area']['area_name']}</td>
              </tr>
            ) : null
          }
          {
            incident['location']['location'] ? (
              <tr>
                <th><strong>Address</strong></th>
                <td>{incident['location']['location']}</td>
              </tr>
            ) : null
          }
          {
            incident['location']['cross_street'] ? (
              <tr>
                <th><strong>Cross Street</strong></th>
                <td>{incident['location']['cross_street']}</td>
              </tr>
            ) : null
          }
          {
            incident['crime']['desc'] ? (
              <tr>
                <th><strong>Crime</strong></th>
                <td>{incident['crime']['desc']}</td>
              </tr>
            ) : null
          }
          {
            incident['premise']['desc'] ? (
              <tr>
                <th><strong>Premise</strong></th>
                <td>{incident['premise']['desc']}</td>
              </tr>
            ) : null
          }
          {
            incident['weapon']['desc'] ? (
              <tr>
                <th><strong>Weapon</strong></th>
                <td>{incident['weapon']['desc']}</td>
              </tr>
            ) : null
          }
          {
            incident['modus_operandi']['desc'] ? (
              <tr>
                <th><strong>MO</strong></th>
                <td>{incident['modus_operandi']['desc']}</td>
              </tr>
            ) : null
          }
        </table>
        <div className="actions">
          <button className="update" onClick={handleUpdate}>Update</button>
          <button className="close" onClick={onClose}>Close</button>
          <button className="delete" onClick={() => doDelete(incident['_id'], incident['dr_no'])}>Delete</button>
        </div>
      </div>
    </div>
  );
};