import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleRegister: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleLogin: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            {isLogin ? "Login" : "Register"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold">
            {isLogin ? "Sign in to your account" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Send email and password to{" "}
            <span className="text-slate-200">
              {isLogin ? "/api/auth/login" : "/api/auth/register"}
            </span>
            .
          </p>
        </div>

        <div className="flex gap-2 rounded-lg border border-slate-700 bg-slate-950/50 p-1">
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
              !isLogin
                ? "bg-cyan-400 text-slate-950"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
              isLogin
                ? "bg-cyan-400 text-slate-950"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Login
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={isLogin ? handleLogin : handleRegister}
        >
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Email</span>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Password</span>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <button
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
