import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      });
  };

  return (
    <>
      <h1>User management client site</h1>
      <h3>users: {users.length}</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" />
        <br />
        <input type="email" placeholder="Email" name="email" />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id}: {user.name}: {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
