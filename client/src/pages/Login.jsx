import { login as loginApi } from "../api";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext"; // ✅ Import context

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use login method from context

  const handleLogin = async (data) => {
    try {
      const res = await loginApi(data);
      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      login(result.user.id); // ✅ Set global auth state
      navigate(`/profile/${result.user.id}`);
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="p-6">
      <AuthForm onSubmit={handleLogin} type="login" />
    </div>
  );
}
