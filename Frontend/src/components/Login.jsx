import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!res.ok) {
        console.log("login failed");
      }
      const data = await res.json();
      console.log(data);

      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f8fe]">
      <div className="bg-white p-8 rounded-lg shadow-md w-[350px]">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Login...." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
