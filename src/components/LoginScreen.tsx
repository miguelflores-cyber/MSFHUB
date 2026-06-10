import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, KeyRound, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { signIn, signUp } from '../lib/auth';

interface LoginScreenProps {
  onSuccess: (userInfo: { name: string; email: string }) => void;
}

export default function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          setError('Por favor, insira o seu nome.');
          setLoading(false);
          return;
        }
        const res = await signUp(email, password, name);
        if (res.success && res.user) {
          setSuccessMsg('Conta criada com sucesso! Redirecionando...');
          setTimeout(() => {
            onSuccess({
              name: res.user!.name || name,
              email: res.user!.email,
            });
          }, 1000);
        } else {
          setError(res.error || 'Erro ao registrar.');
        }
      } else {
        const res = await signIn(email, password);
        if (res.success && res.user) {
          setSuccessMsg('Login realizado com sucesso!');
          setTimeout(() => {
            onSuccess({
              name: res.user!.name || 'Estudante',
              email: res.user!.email,
            });
          }, 800);
        } else {
          setError(res.error || 'Erro ao realizar login.');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="login-split-page-wrapper"
      className="min-h-screen w-screen flex flex-col md:flex-row relative bg-[#07050f] overflow-hidden select-none"
    >
      
      {/* ========================================== */}
      {/* LEFT SIDE: CEUB PORTAL (Purple / Dark background color field) */}
      {/* ========================================== */}
      <div
        id="login-pane-ceub"
        className="w-full md:w-1/2 bg-gradient-to-br from-[#120724] via-[#1a0b2e] to-[#0a0514] border-b md:border-b-0 md:border-r border-purple-950/30 min-h-[50vh] md:min-h-screen relative overflow-hidden"
      >
        {/* Glow & Sparkles */}
        <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none" />
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-purple-600/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[15%] left-[20%] w-2 h-2 bg-fuchsia-400 rounded-full blur-[1px] animate-pulse pointer-events-none" />
        <div className="absolute top-[35%] right-[20%] w-1.5 h-1.5 bg-purple-400 rounded-full pointer-events-none" />
      </div>

      {/* ========================================== */}
      {/* RIGHT SIDE: CIL PORTAL (White / Light Blue background color field) */}
      {/* ========================================== */}
      <div
        id="login-pane-cil"
        className="w-full md:w-1/2 bg-gradient-to-br from-[#ffffff] to-[#e8f1ff] min-h-[50vh] md:min-h-screen relative overflow-hidden"
      >
        {/* Glow & Sparks */}
        <div className="absolute inset-0 bg-grid-notebook opacity-25 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-blue-600/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[20%] right-[25%] w-2.5 h-2.5 bg-amber-400 rounded-full blur-[1px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-[40%] left-[15%] w-1.5 h-1.5 bg-blue-400 rounded-full opacity-30 pointer-events-none" />
      </div>

      {/* ========================================== */}
      {/* FLOATING CARD: BRIDGING CENTRALLY */}
      {/* ========================================== */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-20 pointer-events-none md:p-6">
        <motion.div
          id="login-card-scaffold-motion"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pointer-events-auto w-full max-w-md bg-[#130d24]/95 border border-[#3b2b63] rounded-2xl shadow-2xl overflow-hidden shadow-purple-950/40 relative"
        >
          {/* Top aesthetic color ribbon depicting CEUB (purple) & CIL (blue) split */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          <div className="p-7 space-y-6">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-black">
                  Identificação Estudantil
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  BUILD v1.3
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white font-display">
                {isSignUp ? 'Criar Conta de Aluno' : 'Entrar no Sistema'}
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Insira suas credenciais corporativas unificadas para acessar seu painel acadêmico.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  id="login-error-alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-3 flex items-start gap-2.5 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span>{error}</span>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  id="login-success-alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-3 flex items-start gap-2.5 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required={isSignUp}
                      disabled={loading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Miguel Flores"
                      className="w-full bg-[#0a0514] hover:bg-[#0f081d] focus:bg-[#07030d] border border-purple-950/80 focus:border-purple-500/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/10 placeholder:text-slate-600 transition-all font-sans"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Endereço de E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aluno@sempreceub.com"
                    className="w-full bg-[#0a0514] hover:bg-[#0f081d] focus:bg-[#07030d] border border-purple-950/80 focus:border-indigo-500/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-600 transition-all font-sans"
                  />
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Senha de Acesso</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                    className="w-full bg-[#0a0514] hover:bg-[#0f081d] focus:bg-[#07030d] border border-purple-950/80 focus:border-indigo-500/50 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-600 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-70 text-white rounded-xl py-3 text-sm font-bold shadow-lg shadow-indigo-950/50 flex justify-center items-center gap-2 cursor-pointer transition-all mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <span>{isSignUp ? 'Criar minha conta' : 'Entrar no Sistema'}</span>
                )}
              </button>
            </form>

            {/* Switch authentication modes */}
            <div className="text-center pt-2 border-t border-purple-950/30">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-xs text-indigo-300 hover:text-indigo-200 hover:underline transition-all cursor-pointer"
              >
                {isSignUp ? 'Já possui login? Entre aqui' : 'Novo por aqui? Crie uma conta de aluno'}
              </button>
            </div>
          </div>
          
          {/* Bottom Security Label */}
          <div className="bg-[#0b0714] px-7 py-3 flex justify-between items-center text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Portal de Identificação Protegido
            </span>
            <span className="font-mono text-purple-400/80 font-bold">100% SECURE</span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
