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
    { name: 'Top 5 Areas', value: 'Top5Areas' },
    { name: 'Top 5 Crimes', value: 'Top5Crimes' },
    { name: 'Top 5 Premises', value: 'Top5Premises' },
    { name: 'Top 5 Weapons', value: 'Top5Weapons' },
    { name: 'Victim Distribution', value: 'VictimDistribution' }
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