import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState({ field: "name", order: "asc" });

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let valA, valB;

      if (sortBy.field === "company") {
        valA = a.company.name.toLowerCase();
        valB = b.company.name.toLowerCase();
      } else {
        valA = a[sortBy.field].toLowerCase();
        valB = b[sortBy.field].toLowerCase();
      }

      if (sortBy.order === "asc") {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });

  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <UserTable users={filteredUsers} sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
};

export default Dashboard;
