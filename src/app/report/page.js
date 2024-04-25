'use client'

import Link from "next/link";
import React from "react";
import './Report.css';

// /getAreas
// /getCrimes
// /getMOs
// /getPremises
// /getWeapons

const getData = async () => {
  const areas = [];
  const crimes = [];
  const modus_operandi = [];
  const premises = [];
  const weapons = [];
};

export default function Report() {
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  
  const col_map = {
    'area': ['area', 'area_name'],
    'modus_operandi': ['mocodes'],
    'premise': ['premis_cd', 'premis_desc'],
    'status': ['status', 'status_desc'],
    'weapon': ['weapon_used_cd', 'weapon_desc'],
    'victim': ['vict_age','vict_sex', 'vict_descent'],
    'crime': ['crm_cd', 'crm_cd_desc'],
    'location': ['location', 'cross_street'],
    'incident': ['date_rptd', 'date_occ', 'time_occ']
  }

  return (
    <div className="report-container">
      <div className="filler"></div>
      <h2>Report Incident</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="area">Area</label>
          <input type="text" name="area" onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage('');
          }} required />
        </div>
        <div>
          <label htmlFor="victim-age">Victim Age</label>
          <input type="text" name="victim-age" onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage('');
          }} required />
        </div>
        <div>
          <label htmlFor="crime-desc">Crime Description</label>
          <input type="text" name="crime-desc" onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage('');
          }} required />
        </div>
        <div>
          <label htmlFor="weapon-dec">Weapon Description</label>
          <input type="text" name="weapon-desc" onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage('');
          }} required />
        </div>
        {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
        <button type="submit">Submit</button>
      </form>
      <Link className="link home" href="/">&lt; Home</Link>
      <div className="filler"></div>
    </div>
  )
};