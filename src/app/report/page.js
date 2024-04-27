'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import './Report.css';

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

export default function Report() {
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
  }, []);

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

  const handleSubmit = async (e) => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/saveIncidentReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitizedFormData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Incident report submitted successfully. You will be redirected to the home page now.');
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

  return (
    <div className="report-container">
      <div className="filler"></div>
      <h2>Report Incident</h2>
      <p><span className="required"></span> Mandatory fields</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="datetime-occ" className="required">When did the incident occur?</label>
          <input type="datetime-local" name="datetime-occ" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="victim-age" className="required">Age</label>
          <input type="number" name="victim-age" min="1" max="130" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="victim-sex" className="required">Gender</label>
          <select name="victim-sex" onChange={handleChange} required>
            <option value={null}>Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="X">Unknown</option>
          </select>
        </div>
        <div>
          <label htmlFor="victim-descent" className="required">Descent</label>
          <select name="victim-descent" onChange={handleChange} required>
            <option value={null}>Select descent</option>
            <option value="A">Other Asian</option>
            <option value="B">Black</option>
            <option value="C">Chinese</option>
            <option value="D">Cambodian</option>
            <option value="F">Filipino</option>
            <option value="G">Guamanian</option>
            <option value="H">Hispanic/Latin/Mexican</option>
            <option value="I">American Indian/Alaskan Native</option>
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
        </div>
        <div>
          <label htmlFor="area-name" className="required">Area</label>
          <select name="area-name" onChange={handleChange} required>
            <option value={null}>Select area</option>
            {areaList.map((area, idx) => (
              <option key={idx} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location">Address</label>
          <input type="text" name="location" maxLength="200" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cross-street">Cross Street</label>
          <input type="text" name="cross-street" maxLength="200" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="premise-desc">Premise</label>
          <select name="premise-desc" onChange={handleChange}>
            <option value={null}>Select premise</option>
            {premiseList.map((premise, idx) => (
              <option key={idx} value={premise}>{premise}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="weapon-desc">Weapon</label>
          <select name="weapon-desc" onChange={handleChange}>
            <option value={null}>Select weapon</option>
            {weaponList.map((weapon, idx) => (
              <option key={idx} value={weapon}>{weapon}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="crime-desc">Crime</label>
          <select name="crime-desc" onChange={handleChange}>
            <option value={null}>Select crime</option>
            {crimeList.map((crime, idx) => (
              <option key={idx} value={crime}>{crime}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mo-desc">MO</label>
          <select name="mo-desc" onChange={handleChange}>
            <option value={null}>Select MO</option>
            {moList.map((mo, idx) => (
              <option key={idx} value={mo}>{mo}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status-desc">Status</label>
          <select name="status-desc" onChange={handleChange}>
            <option value={null}>Select status</option>
            {statusList.map((status, idx) => (
              <option key={idx} value={status}>{status}</option>
            ))}
          </select>
        </div>
        {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
        <button type="submit">Submit</button>
      </form>
      <Link className="link-home" href="/">&lt; Home</Link>
      <div className="filler"></div>
    </div>
  )
};