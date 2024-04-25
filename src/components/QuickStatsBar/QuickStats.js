'use client'

import { useState } from "react";
import DataTable from "react-data-table-component";
import './QuickStats.css';

const fetchData = async (endpoint) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/${endpoint}`, {
        method: 'GET',
        headers: { 'accept': 'application/json' }
    });

    if (data.ok) {
        return await data.json();
    } else {
        console.error(`Failed to fetch QuickStats data from /${endpoint}: ${data.status} ${data.statusText}`);
    }
}

export default function QuickStats({ items }) {
    const [currentView, setCurrentView] = useState(null);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    
    const handleClick = async (e) => {
        e.preventDefault();
        
        const result = await fetchData(e.target.value);
        const colName = e.target.name;
        const resultColumns = [
            {
                name: colName,
                selector: row => row.colName
            },
            {
                name: 'Count',
                selector: row => row.count,
                sortable: true
            }
        ];
        
        let resultData = [];

        if(result) {
            result.forEach((item) => {
                resultData.push({ colName: item['_id'], count: item['count'] });
            });
        }

        setCurrentView(e.target.value);
        setColumns(resultColumns);
        setData(resultData);
    }

    const renderContent = () => {
        if(!currentView) {
            return (
                <div className="quick-stats">
                    <p>Table or visualizations will be added here</p>
                </div>
            );
        } else {
            return (
                <div className="quick-stats">
                    <DataTable
                        columns={columns}
                        data={data}
                        highlightOnHover={true}
                        theme="dark"
                    />
                </div>
            );
        }
    };

    return (
        <>
            <div className="quick-stats-bar">
                {items ? items.map((item) => (
                    <button key={item.value} name={item.name} value={item.value} onClick={handleClick}>{item.name}</button>
                )) : null
                }
            </div>
            <div className="filler"></div>
            {renderContent()}
        </>
    );
}
