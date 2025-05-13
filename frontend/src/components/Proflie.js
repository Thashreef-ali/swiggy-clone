import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUpdatedName(userData.name);
      setUpdatedEmail(userData.email);
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://swiggy-clone-backend-g9z2.onrender.com/api/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedName,
          email: updatedEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEditing(false);
      alert("Profile updated!");
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  if (!user) return <p style={{ color: "#fff" }}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card} className="fade-in">
        <h2 style={styles.title}>Profile</h2>

        {editing ? (
          <>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="Email"
            />
            <button onClick={handleUpdate}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffffcc",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    animation: "fadeIn 1s ease-in-out",
    maxWidth: "400px",
    width: "90%",
  },
  title: {
    marginBottom: "1rem",
    color: "#333",
  },
};

export default Profile;
