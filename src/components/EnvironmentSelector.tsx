import { useState } from 'react';
import { Globe, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Environment } from '../types';

interface EnvironmentSelectorProps {
  onSelectEnvironment: (env: Environment) => void;
  studentName: string;
}

export default function EnvironmentSelector({
  onSelectEnvironment,
  studentName,
}: EnvironmentSelectorProps) {
  // Track hover status: 'left' | 'right' | null
  const [hoveredPanel, setHoveredPanel] = useState<'CEUB' | 'CIL' | null>(null);

  return (
    <div
      id="env-selector-container"
      className="fixed inset-0 h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-[#060e20] z-50 text-slate-100"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(142,45,226,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(0,86,150,0.15)_0%,transparent_60%)]" />
      </div>

      {/* Top Universal Header Overlay */}
      <div className="absolute top-0 left-0 w-full z-30 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
          <span className="font-sans text-xs font-black tracking-[0.3em] uppercase text-slate-300">
            MSFHUB PORTAL ACADÊMICO
          </span>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs text-slate-400 font-semibold block">CONECTADO COMO</span>
          <span className="text-xs text-indigo-300 font-black tracking-wider uppercase">
            {studentName}
          </span>
        </div>
      </div>

      {/* --- PANEL LEFT: CEUB (Dark, Purple Theme) --- */}
      <div
        id="panel-left-ceub"
        onMouseEnter={() => setHoveredPanel('CEUB')}
        onMouseLeave={() => setHoveredPanel(null)}
        onClick={() => onSelectEnvironment('CEUB')}
        className={`relative h-1/2 md:h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 ease-out z-10 border-b md:border-b-0 md:border-r border-purple-900/10
          ${
            hoveredPanel === 'CEUB'
              ? 'md:w-[58%] h-[55%] md:h-full'
              : hoveredPanel === 'CIL'
              ? 'md:w-[42%] h-[45%] md:h-full opacity-60'
              : 'md:w-[50%] h-[50%] md:h-full'
          }
          bg-gradient-to-br from-[#1a0b2e] to-[#0b1326]
        `}
      >
        {/* Glow and decoration curves */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(142,45,226,0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-fuchsia-500 rounded-full blur-[1px] opacity-70 animate-pulse" />
        <div className="absolute bottom-[20%] left-[25%] w-2 h-2 bg-purple-400 rounded-full blur-[2px] opacity-50" />
        <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-60" />

        {/* Diagonal grid pattern overlay specific to CEUB */}
        <div className="absolute inset-0 opacity-[0.03] bg-grid-dark pointer-events-none" />

        {/* Content Group with delay */}
        <div className="relative text-center px-8 max-w-sm flex flex-col items-center select-none space-y-6">

          <div className="space-y-2">
            <div className="w-60 md:w-68 mx-auto py-3 filter drop-shadow-[0_0_25px_rgba(142,45,226,0.4)]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgxTimDpBU0iBVFusdw3YAkijS14q-PDP-rsR9-uaoG0HJ_tnVeTyZQ-o2vjGudOwVayq3cVF8glZ5h5_iadxSg_imTIryl19sEkfdLpjVumiHIaZmg_9upicvGTEFpv4cFmBoo7pepqtqtbH-ICK-DStrajZ5WuqDyk4i0KEbZkwr339MkCxzqoDyj8SQMOTxwRFsGSodk88ksweK9dKcAD-RVeGzpIuTjTtULA3SS_lT-aSsVuzRM-yyC96ix4gduPufkc-KsC9G"
                alt="Portal CEUB Logo"
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-xs transition-opacity duration-300">
            Acesse o ecossistema acadêmico de graduação, monte seus cronogramas de matérias e gerencie tarefas de engenharia e modelagem.
          </p>

          <div
            className={`flex items-center gap-2 text-xs font-black uppercase text-purple-400 px-4 py-2 rounded-xl bg-purple-950/20 border border-purple-500/20 transition-all duration-300
              ${hoveredPanel === 'CEUB' ? 'opacity-100 translate-y-0 scale-105 bg-purple-950/40' : 'opacity-82'}
            `}
          >
            <span>Acessar Portal CEUB</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* --- PANEL RIGHT: CIL (Light-ish, Technical Blue Theme) --- */}
      <div
        id="panel-right-cil"
        onMouseEnter={() => setHoveredPanel('CIL')}
        onMouseLeave={() => setHoveredPanel(null)}
        onClick={() => onSelectEnvironment('CIL')}
        className={`relative h-1/2 md:h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 ease-out z-10
          ${
            hoveredPanel === 'CIL'
              ? 'md:w-[58%] h-[55%] md:h-full'
              : hoveredPanel === 'CEUB'
              ? 'md:w-[42%] h-[45%] md:h-full opacity-60'
              : 'md:w-[50%] h-[50%] md:h-full'
          }
          bg-gradient-to-br from-[#ffffff] to-[#e4efff] text-slate-900
        `}
      >
        {/* Glow and decoration curves */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,86,150,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-[30%] right-[10%] w-2.5 h-2.5 bg-blue-500 rounded-full blur-[1px] opacity-40" />
        <div className="absolute bottom-[25%] right-[25%] w-2 h-2 bg-amber-400 rounded-full blur-[2px] opacity-50" />
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-slate-400 rounded-full opacity-30" />

        {/* Notebook horizontal lines specific to CIL */}
        <div className="absolute inset-0 opacity-[0.25] bg-grid-notebook pointer-events-none" />

        {/* Content Group */}
        <div className="relative text-center px-8 max-w-sm flex flex-col items-center select-none space-y-6">

          <div className="space-y-2">
            <div className="w-60 md:w-68 mx-auto py-3 filter drop-shadow-[0_0_20px_rgba(0,86,150,0.15)]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGm7pZoPL83jrSCweCwtJ4mrqypow_vCk6qMDCzodKqk6mpNgwZUVmipskJ-92VD44fe1MdNh_NRQA5fo6Qp4jn2E-sKN4VO83Q4yC8x2qSYgcRXzgo5z7Uyoy4Hu81e4HTcBp8NZgwKEoSiynjwVFAjQkq1x9_igA-CEogvrad4vl09qb01KBYOGm3CVLnCmrRLcJWYZZqKvLlzgpKFLLWUnsIYbCg_sx5yzUeQnnRbSDRqc7-yp0IDaSBXhKJ_-IzyelL66ulrEr"
                alt="Portal CIL Logo"
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xs transition-opacity duration-300">
            Acompanhe suas aulas síncronas de Francês, avaliações orais de Inglês e progresso de proficiência linguística estruturada.
          </p>

          <div
            className={`flex items-center gap-2 text-xs font-black uppercase text-blue-800 px-4 py-2 rounded-xl bg-blue-50/80 border border-blue-500/15 transition-all duration-300
              ${hoveredPanel === 'CIL' ? 'opacity-100 translate-y-0 scale-105 bg-blue-100' : 'opacity-82'}
            `}
          >
            <span>Acessar Portal CIL</span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
          </div>
        </div>
      </div>

      {/* Center Navigation Prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
        <p className="text-center text-[10px] font-black tracking-[0.25em] text-slate-400 group-hover:text-white uppercase flex items-center justify-center gap-2.5">
          <span className="w-8 h-px bg-slate-700" />
          <span>POR FAVOR, SELECIONE O PORTAL DE ENTRADA</span>
          <span className="w-8 h-px bg-slate-700" />
        </p>
      </div>

      {/* Bottom Security Badge */}
      <div className="absolute bottom-4 left-6 hidden md:flex items-center gap-1.5 text-slate-400/60 z-30 select-none">
        <ShieldCheck className="w-4 h-4" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Acesso Unificado Seguro</span>
      </div>
    </div>
  );
}
