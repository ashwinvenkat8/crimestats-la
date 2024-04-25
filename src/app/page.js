import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import QuickStats from "@/components/QuickStatsBar/QuickStats";
import Search from "@/components/Search/Search";

export default function Home() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Report an Incident", link: "/report" },
    { name: "LAPD Login", link: "/internal/login" }
  ];
  const quickStatsItems = [
    { name: 'Top 5 Areas', value: 'top5areas' },
    { name: 'Top 5 Crimes', value: 'top5crimes' },
    { name: 'Top 5 Premises', value: 'top5premises' },
    { name: 'Top 5 Weapons', value: 'top5weapons' },
    { name: 'Victim Gender Distribution', value: 'victimDistributionByGender' },
    { name: 'Victim Descent Distribution', value: 'victimDistributionByDescent' }
  ];
  
  return (
    <div className="home">
      <header>
          { <NavBar navItems={navItems} /> }
      </header>
      <main>
        <div className="container">
          <Search />
          <QuickStats items={quickStatsItems} />
          <div className="filler"></div>
        </div>
      </main>
      <footer>Built by Ashwin, Allen and Blake for D532, Spring 2024</footer>
    </div>
  );
}
