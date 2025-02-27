import { useEffect, useState } from "react";
import UserTableRow from "./UserTableRow";

async function fetchUsers(page) {
  const res = await fetch(`https://reqres.in/api/users?page=${page}`);
  const data = await res.json();
  return data;
}

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      setIsLoading(true);
      async function getUsers() {
        const data = await fetchUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      }
      getUsers();
    },
    [page]
  );

  function handleDeleteUser(userid) {
    setUsers((prev) => prev.filter((user) => user.id !== userid));
  }

  return (
    <section>
      <h1 className="text-center text-3xl font-bold">Dashboard</h1>

      {isLoading ? (
        "Loading..."
      ) : (
        <table className="w-full flex flex-col gap-2 mt-10">
          <thead>
            <tr className="flex">
              <th className="flex justify-center items-center">ID</th>
              <th className="flex mx-1 sm:mx-0 sm:flex-1 justify-center items-center">
                Avatar
              </th>
              <th className="flex-1 flex justify-center items-center">Name</th>
              <th className="sm:flex-1 mx-1 sm:mx-0 flex justify-center items-center">
                User Details
              </th>
              <th className="sm:flex-1 mx-1 sm:mx-0 flex justify-center items-center">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-2">
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                deleteUser={handleDeleteUser}
              />
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center gap-4">
        <button
          disabled={totalPages === page}
          onClick={() => setPage((page) => page + 1)}
          className="bg-green-500 text-green-50 px-4 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          {"<"} Next
        </button>
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
          className="bg-green-500 text-green-50 px-4 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Prev &gt;
        </button>
      </div>
    </section>
  );
}
