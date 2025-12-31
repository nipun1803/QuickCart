import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../utils/api";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeOAuth = async () => {
      const temp = searchParams.get("temp");

      if (!temp) {
        navigate("/signin");
        return;
      }

      try {
        // 🔑 This sets the HTTP-only jwt cookie
        await api.get(`/auth/oauth/finalize?temp=${temp}`);

        // Now cookie exists → profile will work
        navigate("/", { replace: true });
      } catch (error) {
        console.error("OAuth finalize failed:", error);
        navigate("/signin");
      }
    };

    finalizeOAuth();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Signing you in…</p>
    </div>
  );
};

export default AuthCallback;