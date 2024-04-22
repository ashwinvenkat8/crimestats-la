import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import QuickStatsBar from "@/components/QuickStatsBar/QuickStatsBar";
import Search from "@/components/Search/Search";

export default function Home() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Report an Incident", link: "/report" },
    { name: "LAPD Login", link: "/internal/login" }
  ];
  const quickStatsItems = [
    { name: 'Top 5 Areas', value: 'Top5AreasByIncidentFrequency' },
    { name: 'Top 5 Crimes', value: 'Top5CrimesByIncidentFrequency' },
    { name: 'Top 5 Premises', value: 'Top5PremisesByIncidentFrequency' },
    { name: 'Top 5 Weapons', value: 'Top5WeaponsByIncidentFrequency' },
    { name: 'Victim Distribution', value: 'VictimDistributionByGender' }
  ];
  
  return (
    <div className="home">
      <header>
          { <NavBar navItems={navItems} /> }
      </header>
      <main>
        <div className="container">
          <Search />
          <QuickStatsBar items={quickStatsItems} />
          <div className="filler"></div>
        </div>
      </main>
      <footer>Built by Ashwin, Allen and Blake for D532, Spring 2024</footer>
    </div>
  );
}
