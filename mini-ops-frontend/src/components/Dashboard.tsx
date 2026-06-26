import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "GET",
    });
    if (response.ok) {
      toast.success("Logout successful");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Welcome back</h1>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
