export default function NavBar({ navItems }) {
    return (
        <nav>
            <div className="site-name">
                <a href="/">CrimeStats.LA</a>
            </div>
            <div className="filler"></div>
            {navItems.map((item) => (
                <div key={item.link} className="nav-item">
                    <a href={item.link}>{item.name}</a>
                </div>
            ))}
        </nav>
    );
}
