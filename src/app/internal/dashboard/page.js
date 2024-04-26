import NavBar from "@/components/NavBar/NavBar";
import Table from "@/components/Table/Table";
import "./Dashboard.css";

const Dashboard = () => {
  const navItems = [
    { name: "Logout", link: "/internal/login" }
  ];

  return (
    <div className="dashboard">
      <header>
        {<NavBar navItems={navItems} />}
      </header>
      <main>
        <div className="container">
          <Table data={[]} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;