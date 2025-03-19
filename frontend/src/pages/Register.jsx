import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      localStorage.setItem("idToken", idToken);

      navigate("/dashboard");
    } catch (error) {
      setError("Erro ao criar conta: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-12">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Criar Conta</h2>
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input type="email" placeholder="E-mail" className="w-full p-3 border border-gray-300 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" className="w-full p-3 border border-gray-300 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirme a Senha" className="w-full p-3 border border-gray-300 rounded-lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="w-full p-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700">{loading ? "Criando Conta..." : "Criar Conta"}</button>
        </form>

        <p className="mt-4 text-gray-600 text-center">
          Já tem uma conta? <button onClick={() => navigate("/")} className="text-blue-600 font-semibold hover:underline">Entrar</button>
        </p>
      </div>
    </div>
  );
};

export default Register;