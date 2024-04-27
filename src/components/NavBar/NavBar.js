'use client'

import './NavBar.css';

export default function NavBar({ navItems }) {
    const handleLogout = () => {
        sessionStorage.removeItem('auth');
        alert('You have been logged out. Kindly clear your browser cookies and site data. You will be redirected to the login page now.');
    };

    return (
        <nav>
            <div className="site-name">
                <a href="/">CrimeStats.<span className="site-name la">LA</span></a>
            </div>
            <div className="filler"></div>
            {navItems.map((item) => (
                <div key={item.link} className="nav-item">
                    {item.name === "Logout" ? (
                        <a href={item.link} onClick={handleLogout}>{item.name}</a>
                    ) : (
                        <a href={item.link}>{item.name}</a>
                    )}
                </div>
            ))}
        </nav>
    );
}
