import { useState } from "react";
import toast from "react-hot-toast";

function CreateUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  async function handleCreateUser(e) {
    e.preventDefault();
    const res = await fetch(`https://reqres.in/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    if (res.ok) {
      toast.success("User has been successfully created.");
    }
  }
  return (
    <div>
      <h1 className="font-bold text-center my-4 text-3xl">Create User</h1>
      <form
        onSubmit={handleCreateUser}
        className="flex flex-col items-center gap-4 w-full"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-200 w-full md:w-[500px] p-2 outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-200 w-full md:w-[500px] p-2 outline-none"
          type="text"
          placeholder="Name"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-200 w-full md:w-[500px] p-2 outline-none"
          type="password"
          placeholder="Password"
        />
        <button className="bg-green-500 w-full md:w-[500px] text-white p-2 outline-none cursor-pointer">
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
