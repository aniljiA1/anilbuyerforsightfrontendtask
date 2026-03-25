import { useNavigate } from "react-router-dom";

const UserTable = ({ users, sortBy, setSortBy }) => {
  const navigate = useNavigate();

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      order:
        prev.field === field ? (prev.order === "asc" ? "desc" : "asc") : "asc",
    }));
  };

  const getArrow = (field) => {
    if (sortBy.field !== field) return "";
    return sortBy.order === "asc" ? " ↑" : " ↓";
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>Name{getArrow("name")}</th>
          <th>Email</th>
          <th>Phone</th>
          <th onClick={() => handleSort("company")}>
            Company{getArrow("company")}
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
