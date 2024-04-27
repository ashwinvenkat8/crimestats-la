'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [areaList, setAreaList] = useState([]);
  const [formData, setFormData] = useState({
    area: {
      area: 0,
      areaName: "test"
    },
    modusOperandi: {
      code: 0,
      desc: "test"
    },
    crime: {
      code: 0,
      desc: "test"
    },
    premise: {
      code: 0,
      desc: "test"
    },
    weapon: {
      code: 0,
      desc: "test"
    },
    status: {
      code: "test",
      desc: "test"
    },
    location: {
      location: "test",
      crossStreet: "test",
      lat: 1.0,
      lon: 1.0
    },
    victim: {
      age: 0,
      sex: "X",
      descent: "X"
    },
    incident: {
      drNo: 0,
      dateRptd: "1970-01-01T00:00:00.000Z",
      dateOcc: "1970-01-01T00:00:00.000Z",
      timeOcc: 0
    }
  });
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    async function fetchAreas() {
      const areasResult = await fetchData('getAreas');
      console.log(areasResult);
      const areas = areasResult.map((area) => area.area_name);
      setAreaList(areas);
    }
    fetchAreas();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  // const ageList = Array.from(new Array(130), (x, i) => i + 1);

  return (
    <div className="report-container">
      <div className="filler"></div>
      <h2>Report Incident</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="datetime_occ" className="required">When did the incident occur?</label>
          <input type="datetime-local" name="date_occ" onChange={(e) => {
            setErrorMessage('');
          }} required />
        </div>
        <div className="victim-info">
          <div>
            <label htmlFor="vict_age" className="required">Victim Age</label>
            <input type="number" name="vict_age" min="1" max="130" onChange={(e) => setFormData({ vict_age: e.target.value })} required />
            {/* <select name="vict_age" onChange={(e) => setFormData({ vict_sex: e.target.value })} required>
              <option value={null}>Select age</option>
              {ageList.map((age, idx) => (
                <option ke={idx} value={age}>{age}</option>
              ))}
            </select> */}
          </div>
          <div>
            <label htmlFor="vict_sex" className="required">Victim Gender</label>
            <select name="vict_sex" onChange={(e) => setFormData({ vict_sex: e.target.value })} required>
              <option value={null}>Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="X">Unknown</option>
            </select>
          </div>
          <div>
            <label htmlFor="vict_descent" className="required">Victim Descent</label>
            <select name="vict_descent" onChange={(e) => setFormData({ vict_sex: e.target.value })} required>
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
        </div>
        <div>
          <label htmlFor="area_name" className="required">Area</label>
          <select name="area_name" onChange={(e) => setFormData({ area_name: e.target.value })} required>
            <option value={null}>Select an area</option>
            {areaList.map((area, idx) => (
              <option key={idx} value={area}>{area}</option>
            ))}
          </select>
        </div>
        {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
        <button type="submit">Submit</button>
      </form>
      <Link className="link home" href="/">&lt; Home</Link>
      <div className="filler"></div>
    </div>
  )
};