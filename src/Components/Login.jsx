import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const { token, setToken } = useApp();

  useEffect(
    function () {
      if (!token) return;
      navigate("dashboard");
    },
    [token, navigate]
  );
  async function handleSubmitLogin(e) {
    e.preventDefault();
    const res = await fetch(`https://reqres.in/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      toast.error(data.error);
      return;
    }
    toast.success("Login successful! Welcome back!");
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-center text-3xl my-6 font-bold">Login</h1>
      <form
        onSubmit={handleSubmitLogin}
        className="flex flex-col mt-4 gap-4 border-2 border-black rounded-2xl p-4"
      >
        <input
          required
          className="bg-gray-200 p-2 outline-none"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="bg-gray-200 p-2 outline-none"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2 outline-none cursor-pointer">
          Login
        </button>
      </form>
    </section>
  );
}
