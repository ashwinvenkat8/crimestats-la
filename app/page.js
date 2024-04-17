import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Search from "@/components/Search/Search";

export default function Home() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Report an Incident", link: "/report" },
    { name: "LAPD Login", link: "/internal/login" }
  ];
  
  return (
    <div className="home">
      <header>
          { <NavBar navItems={navItems} /> }
      </header>
      <main>
        <div className="container">
          <Search />
          <div className="filler"></div>
          <p>Table or visualizations will be added here</p>
          <div className="filler"></div>
        </div>
      </main>
      <footer>Built by Ashwin, Allen and Blake for D532, Spring 2024</footer>
    </div>
  );
}
