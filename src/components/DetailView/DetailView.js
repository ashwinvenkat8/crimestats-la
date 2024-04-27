'use client'

import { useEffect, useState } from 'react';
import './DetailView.css';

const fetchData = async (endpoint) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/${endpoint}`, {
    method: 'GET',
    headers: { 'accept': 'application/json' }
  });

  if (data.ok) {
    return await data.json();
  } else {
    console.error(`Failed to fetch data from /${endpoint}: ${data.status} ${data.statusText}`);
  }
}

export default function DetailView({ incident, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [areaCodes, setAreaCodes] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [mocodes, setMocodes] = useState([]);
  const [moList, setMoList] = useState([]);
  const [crimeCodes, setCrimeCodes] = useState([]);
  const [crimeList, setCrimeList] = useState([]);
  const [premiseCodes, setPremiseCodes] = useState([]);
  const [premiseList, setPremiseList] = useState([]);
  const [weaponCodes, setWeaponCodes] = useState([]);
  const [weaponList, setWeaponList] = useState([]);
  const [statusCodes, setStatusCodes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [formData, setFormData] = useState({
    area: {
      area: null,
      areaName: null
    },
    modusOperandi: {
      code: null,
      desc: null
    },
    crime: {
      code: null,
      desc: null
    },
    premise: {
      code: null,
      desc: null
    },
    weapon: {
      code: null,
      desc: null
    },
    status: {
      code: null,
      desc: null
    },
    location: {
      location: null,
      crossStreet: null,
      lat: null,
      lon: null
    },
    victim: {
      age: null,
      sex: null,
      descent: null
    },
    incident: {
      drNo: null,
      dateRptd: null,
      dateOcc: null,
      timeOcc: null
    }
  });

  useEffect(() => {
    async function fetchAreas() {
      const areasResult = await fetchData('getAreas');
      const areas = areasResult.map((area) => area.area_name);
      setAreaCodes(areasResult);
      setAreaList(areas);
    }
    async function fetchModusOperandi() {
      const modusOperandiResult = await fetchData('getMOs');
      const modusOperandi = modusOperandiResult.map((modusOperandi) => modusOperandi.desc);
      setMocodes(modusOperandiResult);
      setMoList(modusOperandi);
    }
    async function fetchCrimes() {
      const crimesResult = await fetchData('getCrimes');
      const crimes = crimesResult.map((crime) => crime.desc);
      setCrimeCodes(crimesResult);
      setCrimeList(crimes);
    }
    async function fetchPremises() {
      const premisesResult = await fetchData('getPremises');
      const premises = premisesResult.map((premise) => premise.desc);
      setPremiseCodes(premisesResult);
      setPremiseList(premises);
    }
    async function fetchWeapons() {
      const weaponsResult = await fetchData('getWeapons');
      const weapons = weaponsResult.map((weapon) => weapon.desc);
      setWeaponCodes(weaponsResult);
      setWeaponList(weapons);
    }
    async function fetchStatuses() {
      const statusesResult = await fetchData('getStatuses');
      const statuses = statusesResult.map((status) => status.desc);
      setStatusCodes(statusesResult);
      setStatusList(statuses);
    }

    fetchAreas();
    fetchModusOperandi();
    fetchCrimes();
    fetchPremises();
    fetchWeapons();
    fetchStatuses();
  }, [isEditing]);
  
  const handleChange = (e) => {
    // Clear error message
    setErrorMessage('');

    switch (e.target.name) {
      case 'datetime-occ': {
        setFormData({
          ...formData,
          incident: {
            ...formData.incident,
            dateRptd: new Date().toISOString(),
            dateOcc: new Date(e.target.value).toISOString(),
            timeOcc: e.target.value.split('T')[1].replace(':', '')
          }
        });
        break;
      }
      case 'area-name': {
        const areaMatch = areaCodes.find((area) => area.area_name === e.target.value);
        setFormData({
          ...formData,
          area: { area: areaMatch.area, areaName: areaMatch.area_name }
        });
        break;
      }
      case 'mo-desc': {
        const moMatch = mocodes.find((mocode) => mocode.desc === e.target.value);
        setFormData({
          ...formData,
          modusOperandi: { code: moMatch.code, desc: moMatch.desc }
        });
        break;
      }
      case 'crime-desc': {
        const crimeMatch = crimeCodes.find((crime) => crime.desc === e.target.value);
        setFormData({
          ...formData,
          crime: { code: crimeMatch.code, desc: crimeMatch.desc }
        });
        break;
      }
      case 'premise-desc': {
        const premiseMatch = premiseCodes.find((premise) => premise.desc === e.target.value);
        setFormData({
          ...formData,
          premise: { code: premiseMatch.code, desc: premiseMatch.desc }
        });
        break;
      }
      case 'weapon-desc': {
        const weaponMatch = weaponCodes.find((weapon) => weapon.desc === e.target.value);
        setFormData({
          ...formData,
          weapon: { code: weaponMatch.code, desc: weaponMatch.desc }
        });
        break;
      }
      case 'status-desc': {
        const statusMatch = statusCodes.find((status) => status.desc === e.target.value);
        setFormData({
          ...formData,
          status: { code: statusMatch.code, desc: statusMatch.desc }
        });
        break;
      }
      case 'location': {
        setFormData({ ...formData, location: { ...formData.location, location: e.target.value }});
        break;
      }
      case 'cross-street': {
        setFormData({ ...formData, location: { ...formData.location, crossStreet: e.target.value }});
        break;
      }
      case 'victim-age': {
        setFormData({ ...formData, victim: { ...formData.victim, age: e.target.value }});
        break;
      }
      case 'victim-sex': {
        setFormData({ ...formData, victim: { ...formData.victim, sex: e.target.value }});
        break;
      }
      case 'victim-descent': {
        setFormData({ ...formData, victim: { ...formData.victim, descent: e.target.value }});
        break;
      }
      default:
        console.error(`Invalid form field: ${e.target.name}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const sanitizedFormData = {
      area: {
        area: DOMPurify.sanitize(formData.area.area),
        areaName: DOMPurify.sanitize(formData.area.areaName)
      },
      modusOperandi: {
        code: DOMPurify.sanitize(formData.modusOperandi.code),
        desc: DOMPurify.sanitize(formData.modusOperandi.desc)
      },
      crime: {
        code: DOMPurify.sanitize(formData.crime.code),
        desc: DOMPurify.sanitize(formData.crime.desc)
      },
      premise: {
        code: DOMPurify.sanitize(formData.premise.code),
        desc: DOMPurify.sanitize(formData.premise.desc)
      },
      weapon: {
        code: DOMPurify.sanitize(formData.weapon.code),
        desc: DOMPurify.sanitize(formData.weapon.desc)
      },
      status: {
        code: DOMPurify.sanitize(formData.status.code),
        desc: DOMPurify.sanitize(formData.status.desc)
      },
      location: {
        location: DOMPurify.sanitize(formData.location.location),
        crossStreet: DOMPurify.sanitize(formData.location.crossStreet),
        lat: DOMPurify.sanitize(formData.location.lat),
        lon: DOMPurify.sanitize(formData.location.lon)
      },
      victim: {
        age: DOMPurify.sanitize(formData.victim.age),
        sex: DOMPurify.sanitize(formData.victim.sex),
        descent: DOMPurify.sanitize(formData.victim.descent)
      },
      incident: {
        drNo: DOMPurify.sanitize(formData.incident.drNo),
        dateRptd: DOMPurify.sanitize(formData.incident.dateRptd),
        dateOcc: DOMPurify.sanitize(formData.incident.dateOcc),
        timeOcc: DOMPurify.sanitize(formData.incident.timeOcc)
      }
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/updateIncident`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitizedFormData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Report submitted successfully. You will be redirected to the home page now.');
        window.location.href = '/';
      } else {
        const errorMessage = 'Failed to submit report. Please try again.';
        alert(errorMessage);
        throw new Error('Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error(error.message);
    }
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
        <div className="detail-view-content-head">
          <h2>Incident Details</h2>
          <button className="edit" onClick={() => setIsEditing(!isEditing)}>
            { isEditing ? "Cancel" : "Edit" }
          </button>
        </div>
        <table>
          {
            incident['dr_no'] && !isEditing ? (
              <tr>
                <th><strong>DR No</strong></th>
                <td>{incident['dr_no']}</td>
              </tr>
            ) : incident['dr_no'] && isEditing ? (
              <tr>
                <th><strong>DR No</strong></th>
                <td>
                  <input type="number" name="dr-no" defaultValue={incident['dr_no']} onChange={handleChange} />
                </td>
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
            incident['date_occ'] && !isEditing ? (
              <tr>
                <th><strong>Date Occurred</strong></th>
                <td>{incident['date_occ']}</td>
              </tr>
            ) : incident['date_occ'] && isEditing ? (
              <tr>
                <th><strong>Date Occurred</strong></th>
                <td>
                  <input type="date" name="date-occ" defaultValue={incident['date_rptd']} onChange={handleChange} />
                </td>
              </tr>
            ) : null
          }
          {
            incident['time_occ'] && !isEditing ? (
              <tr>
                <th><strong>Time Occurred</strong></th>
                <td>{incident['time_occ']}</td>
              </tr>
            ) : incident['time_occ'] && isEditing ? (
              <tr>
                <th><strong>Time Occurred</strong></th>
                <td>
                  <input type="time" name="time-occ" defaultValue={incident['time_occ']} onChange={handleChange} />
                </td>
              </tr>
            ) : null
          }
          {
            incident['victim']['age'] && !isEditing ? (
              <tr>
                <th><strong>Victim Age</strong></th>
                <td>{incident['victim']['age']}</td>
              </tr>
            ) : incident['victim']['age'] && isEditing ? (
              <tr>
                <th><strong>Victim Age</strong></th>
                <td>
                  <input type="number" name="victim-age" defaultValue={incident['victim']['age']} onChange={handleChange} />
                </td>
              </tr>
            ) : null
          }
          {
            incident['victim']['sex'] && !isEditing ? (
              <tr>
                <th><strong>Victim Gender</strong></th>
                <td>{incident['victim']['sex']}</td>
              </tr>
            ) : incident['victim']['sex'] && isEditing ? (
              <tr>
                <th><strong>Victim Gender</strong></th>
                <td>
                  <select name="victim-sex" defaultValue={incident['victim']['sex']} onChange={handleChange}>
                    <option value={null}>Select gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="X">Unknown</option>
                  </select>
                </td>
              </tr>
            ) : null
          }
          {
            incident['victim']['descent'] && !isEditing ? (
              <tr>
                <th><strong>Victim Descent</strong></th>
                <td>{incident['victim']['descent']}</td>
              </tr>
            ) : incident['victim']['descent'] && isEditing ? (
              <tr>
                <th><strong>Victim Descent</strong></th>
                <td>
                  <select name="victim-descent" defaultValue={incident['victim']['descent']} onChange={handleChange}>
                    <option value={null}>Select descent</option>
                    <option value="A">Asian</option>
                    <option value="B">Black</option>
                    <option value="C">Chinese</option>
                    <option value="D">Cambodian</option>
                    <option value="F">Filipino</option>
                    <option value="G">Guamanian</option>
                    <option value="H">Hispanic</option>
                    <option value="I">American Indian</option>
                    <option value="J">Japanese</option>
                    <option value="K">Korean</option>
                    <option value="L">Laotian</option>
                    <option value="O">Other</option>
                    <option value="P">Pacific Islander</option>
                    <option value="S">Samoan</option>
                    <option value="U">Hawaiian</option>
                    <option value="V">Vietnamese</option>
                    <option value="W">White</option>
                    <option value="X">Unknown</option>
                    <option value="Z">Asian Indian</option>
                  </select>
                </td>
              </tr>
            ) : null
          }
          {
            incident['area']['area_name'] && !isEditing ? (
              <tr>
                <th><strong>Area</strong></th>
                <td>{incident['area']['area_name']}</td>
              </tr>
            ) : incident['area']['area_name'] && isEditing ? (
              <tr>
                <th><strong>Area</strong></th>
                <td>
                  <select name="area-name" defaultValue={incident['area']['area_name']} onChange={handleChange}>
                    <option value={null}>Select area</option>
                    {areaList.map((area, idx) => (
                      <option key={idx} value={area}>{area}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ) : null
          }
          {
            incident['location']['location'] && !isEditing ? (
              <tr>
                <th><strong>Address</strong></th>
                <td>{incident['location']['location']}</td>
              </tr>
            ) : incident['location']['location'] && isEditing ? (
              <tr>
                <th><strong>Address</strong></th>
                <td>
                  <input type="text" name="location" maxLength="200" defaultValue={incident['location']['location']} onChange={handleChange} />
                </td>
              </tr>
            ) : null
          }
          {
            incident['location']['cross_street'] && !isEditing ? (
              <tr>
                <th><strong>Cross Street</strong></th>
                <td>{incident['location']['cross_street']}</td>
              </tr>
            ) : incident['location']['cross_street'] && isEditing ? (
              <tr>
                <th><strong>Cross Street</strong></th>
                <td>
                  <input type="text" name="cross-street" maxLength="200" defaultValue={incident['location']['cross_street']} onChange={handleChange} />
                </td>
              </tr>
            ) : null
          }
          {
            incident['crime']['desc'] && !isEditing ? (
              <tr>
                <th><strong>Crime</strong></th>
                <td>{incident['crime']['desc']}</td>
              </tr>
            ) : incident['crime']['desc'] && isEditing ? (
              <tr>
                <th><strong>Crime</strong></th>
                <td>
                  <select name="crime-desc" defaultValue={incident['crime']['desc']} onChange={handleChange}>
                    <option value={null}>Select crime</option>
                    {crimeList.map((crime, idx) => (
                      <option key={idx} value={crime}>{crime}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ) : null
          }
          {
            incident['premise']['desc'] && !isEditing ? (
              <tr>
                <th><strong>Premise</strong></th>
                <td>{incident['premise']['desc']}</td>
              </tr>
            ) : incident['premise']['desc'] && isEditing ? (
              <tr>
                <th><strong>Premise</strong></th>
                <td>
                  <select name="premise-desc" defaultValue={incident['premise']['desc']} onChange={handleChange}>
                    <option value={null}>Select premise</option>
                    {premiseList.map((premise, idx) => (
                      <option key={idx} value={premise}>{premise}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ) : null
          }
          {
            incident['weapon']['desc'] && !isEditing ? (
              <tr>
                <th><strong>Weapon</strong></th>
                <td>{incident['weapon']['desc']}</td>
              </tr>
            ) : incident['weapon']['desc'] && isEditing ? (
              <tr>
                <th><strong>Weapon</strong></th>
                <td>
                  <select name="weapon-desc" defaultValue={incident['weapon']['desc']} onChange={handleChange}>
                    <option value={null}>Select weapon</option>
                    {weaponList.map((weapon, idx) => (
                      <option key={idx} value={weapon}>{weapon}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ) : null
          }
          {
            incident['modus_operandi']['desc'] && !isEditing ? (
              <tr>
                <th><strong>MO</strong></th>
                <td>{incident['modus_operandi']['desc']}</td>
              </tr>
            ) : incident['modus_operandi']['desc'] && isEditing ? (
              <tr>
                <th><strong>MO</strong></th>
                <td>
                  <select name="mo-desc" defaultValue={incident['modus_operandi']['desc']} onChange={handleChange}>
                    <option value={null}>Select MO</option>
                    {moList.map((mo, idx) => (
                      <option key={idx} value={mo}>{mo}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ) : null
          }
          {
            incident['status']['desc'] && !isEditing ? (
              <tr>
                <th><strong>Status</strong></th>
                <td>{incident['status']['desc']}</td>
              </tr>
            ) : incident['status']['desc'] && isEditing ? (
              <tr>
                <th><strong>Status</strong></th>
                <td>
                  <select name="status-desc" defaultValue={incident['status']['desc']} onChange={handleChange}>
                    <option value={null}>Select status</option>
                    {statusList.map((status, idx) => (
                      <option key={idx} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ) : null
          }
        </table>
        {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
        <div className="actions">
          {
            isEditing ? (
              <>
                <button className="update" onClick={() => handleUpdate(incident)}>Update</button>
                <button className="close" onClick={onClose}>Close</button>
              </>
            ) : (
              <>
                <button className="delete" onClick={() => doDelete(incident['_id'], incident['dr_no'])}>Delete</button>
                <button className="close" onClick={onClose}>Close</button>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};