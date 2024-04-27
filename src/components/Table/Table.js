'use client'

import { useEffect, useState } from 'react';
import DetailView from '../DetailView/DetailView';
import './Table.css';

const fetchData = async (skip, limit) => {
    const params = `skip=${parseInt(skip)}&limit=${parseInt(limit)}`;
    const data = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/getIncidents?${params}`, {
        method: 'GET',
        headers: { 'accept': 'application/json' }
    });

    if (data.ok) {
        return await data.json();
    } else {
        console.error(`Failed to fetch data from /getIncidents: ${data.status} ${data.statusText}`);
    }
}

export default function Table() {
    const [data, setData] = useState([{}]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [selectedIncident, setSelectedIncident] = useState(null);

    useEffect(() => {
        fetchData(skip, limit).then((data) => {
            setData(data);
        });
    }, [skip, limit]);

    const handleDetailViewClose = () => {
        setSelectedIncident(null);
    };

    return (
        data?.length > 0 ? ( 
            <div className="table-container">
                <div className="pagination">
                    <span>No. of records: {data.length}</span>
                    <div className="filler"></div>
                    <span>Click on a row to view incident details</span>
                    <div className="filler"></div>
                    <div>
                        <label htmlFor="range">Range </label>
                        <select name="range" onChange={(e) => setSkip(e.target.value)} defaultValue={skip}>
                            <option value="0">1-500</option>
                            <option value="500">500-1000</option>
                            <option value="1000">1000-1500</option>
                            <option value="1500">1500-2000</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="limit">Limit </label>
                        <select name="limit" onChange={(e) => setLimit(e.target.value)} defaultValue={limit}>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">250</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                        </select>
                    </div>
                </div>
                <table className="incidents-table">
                    <thead>
                        <tr>
                            <th>Dr No</th>
                            <th>Date Reported</th>
                            <th>Date Occurred</th>
                            <th>Time Occurred</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((incident, index) => (
                                <tr key={index} onClick={() => {
                                    setSelectedIncident(incident)
                                }}>
                                    <td>{incident.dr_no}</td>
                                    <td>{incident.date_rptd}</td>
                                    <td>{incident.date_occ}</td>
                                    <td>{incident.time_occ}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {selectedIncident && (
                    <DetailView incident={selectedIncident} onClose={handleDetailViewClose} />
                )}
            </div>
        ) : (
            <div className="table-container empty">
                <p>No incident records found</p>
            </div>
        )
    );
}