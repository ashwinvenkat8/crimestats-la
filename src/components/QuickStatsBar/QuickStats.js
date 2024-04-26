'use client'

import { useState } from "react";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './QuickStats.css';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);

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
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});

    const handleClick = async (e) => {
        e.preventDefault();

        const result = await fetchData(e.target.value);

        if(result) {
            let currChartLabels = [];
            let currChartData = {
                labels: currChartLabels,
                datasets: [{
                    label: e.target.name,
                    data: [],
                    backgroundColor: 'rgba(255, 119, 0, 0.7)',
                }]
            };

            result.forEach((item) => {
                currChartLabels.push(item['_id']);
                currChartData.datasets[0].data.push(item['count']);
            });
            
            setChartOptions({
                responsive: 'true',
                plugins: {
                    title: {
                        display: true,
                        text: e.target.name,
                        font: { size: 20 }
                    }
                }
            });
            setChartData(currChartData);
        }

        setCurrentView(e.target.value);
    }

    const renderContent = () => {
        if (!currentView) {
            return (
                <div>
                    <p>Select a category to view statistics</p>
                </div>
            );
        } else {
            return (
                <div className="quick-stats">
                    <Bar options={chartOptions} data={chartData} />
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
