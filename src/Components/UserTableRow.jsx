import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function UserTableRow({ user, deleteUser }) {
  async function handleDeleteUser() {
    const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("User has been successfully deleted.");
      deleteUser(user.id);
    }
  }

  return (
    <tr className="flex">
      <td className="font-bold flex justify-center items-center">{user.id}</td>
      <td className="flex mx-1 sm:mx-0 sm:flex-1 justify-center items-center">
        <img
          className="aspect-square hover:contrast-125 duration-300 w-14 sm:w-20 object-cover"
          src={user.avatar}
          alt={user.first_name}
        />
      </td>
      <td className="flex-1 flex justify-center text-sm sm:text-base items-center">
        {user.first_name} {user.last_name}
      </td>
      <td className="sm:flex-1 mx-1 sm:mx-0 flex justify-center items-center">
        <Link
          to={`/users/${user.id}`}
          className="bg-blue-400 px-2 sm:px-4 py-1 text-blue-50 cursor-pointer"
        >
          View
        </Link>
      </td>
      <td className="sm:flex-1 mx-1 sm:mx-0 flex justify-center items-center">
        <button
          onClick={handleDeleteUser}
          className="bg-red-400 px-2 sm:px-4 py-1 text-red-50 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserTableRow;
