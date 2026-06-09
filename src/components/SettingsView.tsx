import React, { useState } from 'react';
import { User, Mail, BookOpen, Sliders, Shield, Save, Check, Sparkles } from 'lucide-react';
import { StudentProfile, Environment } from '../types';

interface SettingsViewProps {
  environment: Environment;
  profile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
}

export default function SettingsView({
  environment,
  profile,
  onUpdateProfile,
}: SettingsViewProps) {
  const isCEUB = environment === 'CEUB';

  // Form local states
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [activeLanguage, setActiveLanguage] = useState(profile.activeLanguage);
  const [progress, setProgress] = useState(profile.progress);
  const [updated, setUpdated] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      activeLanguage,
      module: `${activeLanguage} - Módulo em andamento`,
      progress: progress,
    });
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  return (
    <div id="settings-tab-content" className="max-w-2xl space-y-6 animate-fade-in">
      <div>
        <h1 className={`text-3xl font-black tracking-tight ${isCEUB ? 'text-white' : 'text-[#003e6f]'}`}>
          Configurações
        </h1>
        <p className="text-slate-400 text-sm font-medium mt-1">
          Gerencie suas preferências acadêmicas e dados do perfil unificado.
        </p>
      </div>

      <div
        className={`rounded-3xl p-6 md:p-8 border transition-all duration-500
          ${
            isCEUB
              ? 'bg-[#171f33]/90 border-purple-900/20 text-slate-100 shadow-md'
              : 'bg-white border-slate-200 text-slate-800 shadow-sm'
          }
        `}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Field */}
            <div className="flex flex-col gap-1.5Col">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2
                  ${
                    isCEUB
                      ? 'bg-slate-900 border-purple-900/30 text-white focus:ring-purple-500/30 focus:border-purple-500'
                      : 'bg-slate-50 border-slate-200 focus:ring-blue-500/30 focus:border-blue-600'
                  }
                `}
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5Col">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Endereço de E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2
                  ${
                    isCEUB
                      ? 'bg-slate-900 border-purple-900/30 text-white'
                      : 'bg-slate-50 border-slate-200'
                  }
                `}
              />
            </div>

            {/* Active Language Class */}
            <div className="flex flex-col gap-1.5Col">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                Curso de Idiomas Ativo (CIL)
              </label>
              <select
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2
                  ${
                    isCEUB
                      ? 'bg-slate-900 border-purple-900/30 text-white'
                      : 'bg-slate-50 border-slate-200'
                  }
                `}
              >
                <option value="Inglês Avançado">Inglês Avançado (Avançado B2/C1)</option>
                <option value="Francês B1">Francês Intermediário (B1)</option>
                <option value="Espanhol Avançado">Espanhol Fluente (C1)</option>
                <option value="Alemão Iniciante">Alemão Básico (A1/A2)</option>
              </select>
            </div>

            {/* Language Study Module Progress Slider */}
            <div className="flex flex-col gap-1.5Col justify-center">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  Progresso do Módulo ({progress}%)
                </label>
                <span className={`text-xs font-black ${isCEUB ? 'text-purple-400' : 'text-blue-600'}`}>
                  {progress}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-blue-600 hover:accent-blue-700 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Reflete na gauge circular da tela Home CIL em tempo real.
              </p>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Seus dados acadêmicos estão protegidos pelo Portal Unificado Securitas.
            </span>

            {/* Dynamic button changes to confirm modifications */}
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-[1.01] transition-transform
                ${
                  updated
                    ? 'bg-emerald-600 text-white'
                    : isCEUB
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/15'
                    : 'bg-[#005696] hover:bg-[#004880] text-white shadow-blue-500/15'
                }
              `}
            >
              {updated ? (
                <>
                  <Check className="w-4.5 h-4.5 animate-bounce" />
                  <span>Perfil Atualizado!</span>
                </>
              ) : (
                <>
                  <Save className="w-4.5 h-4.5" />
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
