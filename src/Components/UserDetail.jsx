import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UserDetail() {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(
    function () {
      async function getUserDetail() {
        const res = await fetch(`https://reqres.in/api/users/${userid}`);
        const data = await res.json();
        if (!res.ok) {
          navigate("/dashboard");
          return;
        }
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
        setEmail(data.data.email);
        setAvatar(data.data.avatar);
      }
      getUserDetail();
    },
    [userid]
  );

  async function handleUpdateUser(e) {
    e.preventDefault();
    const res = await fetch(`https://reqres.in/api/users/${userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
      }),
    });
    if (res.ok) {
      toast.success("User information has been successfully updated.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        className="rounded-full hover:contrast-125 transition-all duration-300"
        src={avatar}
        alt={firstName}
      />
      <form
        onSubmit={handleUpdateUser}
        className="flex flex-col gap-4 w-full lg:w-[500px]"
      >
        <div className="flex gap-2 items-center">
          <label htmlFor="firstName">First Name:</label>
          <input
            required
            id="firstName"
            className="outline-none flex-1 bg-blue-100 px-2 py-1"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="lastName">Last Name:</label>
          <input
            required
            id="lastName"
            className="outline-none flex-1 bg-blue-100 px-2 py-1"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="email">Email:</label>
          <input
            required
            id="email"
            type="text"
            className="outline-none flex-1 bg-blue-100 px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="bg-green-500 cursor-pointer outline-none text-green-50 py-1">
          Save
        </button>
      </form>
    </div>
  );
}

export default UserDetail;
