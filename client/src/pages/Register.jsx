import { register } from "../api";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Import context

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth(); // ✅ use login from context

  const handleRegister = async (data) => {
    setError(""); // Reset error before new attempt
    try {
      const res = await register(data);
      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Registration failed");
        return;
      }

      login(result._id); // ✅ Set global auth state
      navigate(`/profile/${result._id}`);
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <AuthForm onSubmit={handleRegister} type="register" />
    </div>
  );
}


