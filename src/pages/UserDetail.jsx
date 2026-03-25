import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../api/userApi";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsers().then((data) => {
      const foundUser = data.find((u) => u.id === Number(id));
      setUser(foundUser);
    });
  }, [id]);

  if (!user) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      <div className="detail-card">
        <button onClick={() => navigate(-1)} style={{ marginBottom: "10px" }}>
          ← Back
        </button>

        <h2>{user.name}</h2>

        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Phone:</b> {user.phone}
        </p>
        <p>
          <b>Username:</b> {user.username}
        </p>
        <p>
          <b>Website:</b> {user.website}
        </p>

        <p className="section-title">Company</p>
        <p>{user.company?.name}</p>
        <p>{user.company?.catchPhrase}</p>

        <p className="section-title">Address</p>
        <p>
          {user.address?.street}, {user.address?.city}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
