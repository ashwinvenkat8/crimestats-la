import './DetailView.css';

export default function DetailView({ incident, onClose }) {
  return (
    <div className="detail-view">
      <div className="detail-view-content">
        <center><h3>Incident Details</h3></center>
        {
          incident['dr_no'] ? (
            <div>
              <strong>DR No:</strong> {incident['dr_no']}
            </div>
          ) : null
        }
        {
          incident['date_rptd'] ? (
            <div>
              <strong>Date Reported:</strong> {incident['date_rptd']}
            </div>
          ) : null
        }
        {
          incident['date_occ'] ? (
            <div>
              <strong>Date Occurred:</strong> {incident['date_occ']}
            </div>
          ) : null
        }
        {
          incident['time_occ'] ? (
            <div>
              <strong>Time Occurred:</strong> {incident['time_occ']}
            </div>
          ) : null
        }
        {
          incident['victim']['age'] ? (
            <div>
              <strong>Victim Age:</strong> {incident['victim']['age']}
            </div>
          ) : null
        }
        {
          incident['victim']['sex'] ? (
            <div>
              <strong>Victim Sex:</strong> {incident['victim']['sex']}
            </div>
          ) : null
        }
        {
          incident['victim']['descent'] ? (
            <div>
              <strong>Victim Descent:</strong> {incident['victim']['descent']}
            </div>
          ) : null
        }
        {
          incident['area']['area_name'] ? (
            <div>
              <strong>Area:</strong> {incident['area']['area_name']}
            </div>
          ) : null
        }
        {
          incident['location']['location'] ? (
            <div>
              <strong>Address:</strong> {incident['location']['location']}
            </div>
          ) : null
        }
        {
          incident['location']['cross_street'] ? (
            <div>
              <strong>Cross Street:</strong> {incident['location']['cross_street']}
            </div>
          ) : null
        }
        {
          incident['crime']['desc'] ? (
            <div>
              <strong>Crime:</strong> {incident['crime']['desc']}
            </div>
          ) : null
        }
        {
          incident['premise']['desc'] ? (
            <div>
              <strong>Premise:</strong> {incident['premise']['desc']}
            </div>
          ) : null
        }
        {
          incident['weapon']['desc'] ? (
            <div>
              <strong>Weapon:</strong> {incident['weapon']['desc']}
            </div>
          ) : null
        }
        {
          incident['modus_operandi']['desc'] ? (
            <div>
              <strong>MO:</strong> {incident['modus_operandi']['desc']}
            </div>
          ) : null
        }
        <button className="close-detail-view" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};