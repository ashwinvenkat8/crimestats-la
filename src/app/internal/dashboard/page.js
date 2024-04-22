import NavBar from "@/components/NavBar/NavBar";
import Search from "@/components/Search/Search";
import "./Dashboard.css";
import Table from "@/components/Table/Table";

const Dashboard = () => {
  const navItems = [
    { name: "Dashboard", link: "/internal/dashboard" },
    { name: "Logout", link: "/internal/login" }
  ];

  return (
    <div className="dashboard">
      <header>
        {<NavBar navItems={navItems} />}
      </header>
      <main>
        <div className="container">
          <Search />
          <Table />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;