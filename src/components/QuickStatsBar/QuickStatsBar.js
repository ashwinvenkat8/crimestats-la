'use client'

import { useState } from "react";
import './QuickStatsBar.css';

export default function QuickStatsBar({ items }) {
    const [currentView, setCurrentView] = useState(null);
    const [quickStatsData, setQuickStatsData] = useState(null);
    
    const handleClick = async (e) => {
        e.preventDefault();
        
        const data = await fetch(`/api/quickstats?view=${e.target.value}`);
        
        setCurrentView(e.target.value);
        setQuickStatsData(data);
    }

    const renderContent = () => {
        switch(currentView) {
            case 'Top5Areas':
                return (
                    <div className="quick-stats">
                        {quickStatsData ? quickStatsData.map((item, index) => (
                            <div key={index} className="quick-stats-item">
                                <p>{item.area}</p>
                                <p>{item.incidents}</p>
                            </div>
                        )) : null}
                    </div>
                );
            case 'Top5Crimes':
                return (
                    <div className="quick-stats"></div>
                );
            case 'Top5Premises':
                return (
                    <div className="quick-stats"></div>
                );
            case 'Top5Weapons':
                return (
                    <div className="quick-stats"></div>
                );
            case 'VictimDistribution':
                return (
                    <div className="quick-stats"></div>
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
