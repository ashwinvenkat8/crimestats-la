'use client'

import Link from "next/link";
import React from "react";
import './Report.css';

export default function Report() {
  const [formData, setFormData] = React.useState({
    date_rptd: '',
    date_occ: '',
    time_occ: '',
    cross_street: '',
    area_name: '',
    crime_desc: '',
    premise_desc: '',
    weapon_desc: '',
    victim_age: 0,
    victim_sex: '',
    victim_descent: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  
  return (
    <div className="report-container">
      <div className="filler"></div>
      <h2>Report Incident</h2>
      <form onSubmit={handleSubmit}>
        <div className="temporal-info">
          <div>
            <label htmlFor="date">Incident Date</label>
            <input type="date" name="date_occ" onChange={(e) => {
              setErrorMessage('');
            }} required />
          </div>
          <div>
            <label htmlFor="date">Incident Time</label>
            <input type="time" name="time_occ" onChange={(e) => {
              setErrorMessage('');
            }} required />
          </div>
        </div>
        <div>
          <label htmlFor="area_name">Area</label>
          <select name="area_name" onChange={(e) => setFormData({ area_name: e.target.value })}>
            <option value={null}>Select an area...</option>
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