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
    // const [columns, setColumns] = useState([]);
    // const [data, setData] = useState([]);
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
                    backgroundColor: 'rgba(100, 100, 220, 0.5)',
                }]
            };

            result.forEach((item) => {
                currChartLabels.push(item['_id']);
                currChartData.datasets[0].data.push(item['count']);
            });
            
            setChartOptions({
                responsive: 'true',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                plugins: {
                    title: {
                        display: true,
                        text: e.target.name,
                        font: {
                            size: 20
                        },
                        color: 'white'
                    }
                }
            });
            setChartData(currChartData);
        }

        // const colName = e.target.name;
        // const resultColumns = [
        //     {
        //         name: colName,
        //         selector: row => row.colName
        //     },
        //     {
        //         name: 'Count',
        //         selector: row => row.count,
        //         sortable: true
        //     }
        // ];

        // let resultData = [];

        // if (result) {
        //     result.forEach((item) => {
        //         resultData.push({ colName: item['_id'], count: item['count'] });
        //     });
        // }

        setCurrentView(e.target.value);
        // setColumns(resultColumns);
        // setData(resultData);
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
                    <br />
                    <Bar options={chartOptions} data={chartData} />
                    {/* <table className="quick-stats-table">
                        <thead>
                            <tr>
                                {
                                    columns.map((col, idx) => (
                                        <th key={idx}>{col.name}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((val, idx) => (
                                    <tr key={idx}>
                                        <td>{val.colName}</td>
                                        <td>{val.count}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> */}
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
