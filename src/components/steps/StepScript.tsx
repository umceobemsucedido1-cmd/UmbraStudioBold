import React, { useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { Wand2, FileText, ChevronDown } from 'lucide-react';

const templates = [
    "História de Natal", "Drama Familiar", "Romance Proibido", "Superação Pessoal",
    "Mistério e Segredos", "Vingança e Justiça", "Reencontro Emocional",
    "Amor e Perda", "Queda e Redenção", "Virada de Destino"
];

const StepScript: React.FC = () => {
    const { script, setScript, setStep } = useProjectStore();
    const [showTemplates, setShowTemplates] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleTemplateClick = (template: string) => {
        setScript(`Roteiro base para: ${template}\n\nCena 1: [Descreva a cena inicial]\nCena 2: [O conflito se apresenta]\nCena 3: [Clímax e resolução]`);
        setShowTemplates(false);
    };

    const handleEnhance = () => {
        setIsEnhancing(true);
        setTimeout(() => {
            setScript(script + "\n\n(Texto aprimorado pela IA...)");
            setIsEnhancing(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 1: Roteiro</h2>
                    <p className="text-muted-foreground">Escreva ou cole seu roteiro. Cada quebra de linha virará uma cena.</p>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary px-4 py-2 rounded-lg transition-colors border border-border"
                    >
                        <FileText size={16} /> Templates <ChevronDown size={14} />
                    </button>

                    {showTemplates && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-10 max-h-96 overflow-y-auto p-2 grid gap-1">
                            {templates.map(t => (
                                <button
                                    key={t}
                                    onClick={() => handleTemplateClick(t)}
                                    className="text-left px-3 py-2 hover:bg-primary/10 rounded-md text-sm transition-colors"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm relative group">
                <textarea
                    className="w-full h-[50vh] bg-transparent resize-none focus:outline-none text-lg leading-relaxed font-medium placeholder:text-muted-foreground/30"
                    placeholder="Comece a escrever sua história aqui..."
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                />

                <div className="absolute bottom-4 right-4 flex items-center gap-4">
                    <span className="text-xs text-muted-foreground font-mono">
                        {script.length}/1000 cars
                    </span>
                    <button
                        onClick={handleEnhance}
                        disabled={isEnhancing}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
                    >
                        <Wand2 size={14} className={isEnhancing ? "animate-spin" : ""} />
                        {isEnhancing ? "Aprimorando..." : "Aprimorar com IA"}
                    </button>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={() => setStep(2)}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/25"
                >
                    Próximo: Organizar Cenas
                </button>
            </div>
        </div>
    );
};

export default StepScript;
