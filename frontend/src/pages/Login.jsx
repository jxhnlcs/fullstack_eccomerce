import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/axios'
import { Eye, EyeOff, LogIn } from 'lucide-react' // Ícones modernos
import { FcGoogle } from 'react-icons/fc' // Ícone oficial do Google
import { auth } from '../services/firebaseConfig' // Importa Firebase
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })

      localStorage.setItem('idToken', response.data.idToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)

      navigate('/dashboard')
    } catch (error) {
      setError('Email ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Pegando o token do usuário
      const idToken = await user.getIdToken()

      console.log('Usuário logado com Google:', user)
      console.log('Token de ID do Google:', idToken)

      // Salvando o token no LocalStorage
      localStorage.setItem('idToken', idToken)

      // Redireciona para o dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Erro ao logar com Google:', error)
      setError('Erro ao autenticar com Google.')
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Seção Esquerda: Formulário de Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 md:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-6xl font-bold mb-6 text-gray-800">TechStore</h1>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Entrar</h2>
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">E-mail</label>
              <input
                type="email"
                placeholder="seuemail@gmail.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="text-gray-600 block mb-1">Senha</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10 transition-all duration-300"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition-all duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 p-3 text-white font-semibold rounded-lg transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
              {!loading && <LogIn size={20} />}
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center my-4">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <span className="mx-4 text-gray-400">ou</span>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>

          {/* Botão Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 p-3 text-gray-700 font-semibold border border-gray-300 rounded-lg transition-all duration-300 hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            Entrar com Google
          </button>

          <p className="mt-4 text-gray-600 text-center">
            Não tem uma conta? <button onClick={() => navigate("/register")} className="text-blue-600 font-semibold hover:underline">Criar conta</button>
          </p>
        </div>
      </div>

      {/* Seção Direita: Banner sobre E-commerce */}
      <div className="w-screen bg-gradient-to-r from-blue-600 to-blue-800 flex flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Gerencie seu E-commerce</h2>
          <p className="text-gray-200">
            Controle seus produtos, acompanhe vendas e expanda seu negócio
            online de forma simples e eficiente.
          </p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
