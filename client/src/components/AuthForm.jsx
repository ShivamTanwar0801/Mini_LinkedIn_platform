import { useState } from "react";

export default function AuthForm({ onSubmit, type }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">
        {type === "login" ? "Login to your account" : "Create a new account"}
      </h2>

      {type === "register" && (
        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full rounded"
          onChange={handleChange}
          required
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold w-full py-2 rounded"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
