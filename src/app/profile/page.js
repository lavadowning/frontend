"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, updateCurrentUser } from "@/lib/auth";

const ProfileEdit = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setForm({
            username: user.username || "",
            email: user.email || "",
            address: user.address || "",
          });
        }
      } catch (err) {
        setErrorMsg("Couldn't upload profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await updateCurrentUser(form);
      setSuccessMsg("The data has been updated successfully!");
    } catch (err) {
      setErrorMsg("Couldn't save changes");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-red-500 mb-6">Your profile</h2>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 border border-red-500 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
