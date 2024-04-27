'use client'

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Table from "@/components/Table/Table";
import "./Dashboard.css";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('auth')) {
      window.location.replace('/internal/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

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
          <Table />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;