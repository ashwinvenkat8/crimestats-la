'use client'

import { useState } from "react";
import DataTable from "react-data-table-component";
import './QuickStats.css';

const fetchData = async (endpoint) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    });

    if (data.ok) {
        return await data.json();
    } else {
        console.error(`Failed to fetch QuickStats data from /${endpoint}: ${data.status} ${data.statusText}`);
    }
}

const getQuickStatsData = async (view) => {
    let data = null;

    switch(view) {
        case 'Top5Areas':
            data = await fetchData('top5areas');
            break;
        
        case 'Top5Crimes':
            data = await fetchData('top5crimes');
            break;
        
        case 'Top5Premises':
            data = await fetchData('top5premises');
            break;
        
        case 'Top5Weapons':
            data = await fetchData('top5weapons');
            break;
        
        case 'VictimDistribution':
            data = await fetchData('victimDistribution');
            break;
        
        default:
            console.error(`Invalid QuickStats view: ${view}`);
            return data;
    }

    return data;
};

export default function QuickStats({ items }) {
    const [currentView, setCurrentView] = useState(null);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [quickStatsData, setQuickStatsData] = useState([]);
    
    const handleClick = async (e) => {
        e.preventDefault();
        
        const data = await getQuickStatsData(e.target.value);
        const parsedResult = [];

        data.result.forEach((item) => {
            parsedResult[item.area[0]['area_name']] = item.count;
        });
        
        console.log(parsedResult);
        
        setCurrentView(e.target.value);
        setQuickStatsData(parsedResult);
    }

    const renderContent = () => {
        switch(currentView) {
            case 'Top5Areas':
                return (
                    <div className="quick-stats">
                        <p>Top 5 Areas</p>
                    </div>
                );
            case 'Top5Crimes':
                return (
                    <div className="quick-stats">
                        <p>Top 5 Crimes</p>
                    </div>
                );
            case 'Top5Premises':
                return (
                    <div className="quick-stats">
                        <p>Top 5 Premises</p>
                    </div>
                );
            case 'Top5Weapons':
                return (
                    <div className="quick-stats">
                        <p>Top 5 Weapons</p>
                    </div>
                );
            case 'VictimDistribution':
                return (
                    <div className="quick-stats">
                        <p>Victim Distribution</p>
                    </div>
                );
            default:
                return (
                    <div className="quick-stats">
                        <p>Table or visualizations will be added here</p>
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
