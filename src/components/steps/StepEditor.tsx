import React from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { Play, Download, Settings, Music, Type, Wand2 } from 'lucide-react';

const StepEditor: React.FC = () => {
    const { setStep } = useProjectStore();

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 8: Editar Vídeo</h2>
                    <p className="text-muted-foreground">Monte a prévia, ajuste e exporte o vídeo com suas configurações finais.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg flex items-center gap-2">
                    <Download size={18} /> Exportar Vídeo
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Preview Area */}
                <div className="lg:col-span-2 bg-black rounded-xl border border-border relative overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground">Preview do Vídeo (Placeholder)</span>
                    </div>
                    {/* Fake Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-4">
                        <button className="text-white hover:text-primary transition-colors"><Play size={24} fill="currentColor" /></button>
                        <div className="flex-1 h-1 bg-white/20 rounded-full relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-primary" />
                        </div>
                        <span className="text-white text-xs font-mono">00:15 / 00:45</span>
                    </div>
                </div>

                {/* Tools / Timeline */}
                <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-4">
                    <h3 className="font-semibold border-b border-border pb-2">Ferramentas de Edição</h3>

                    <div className="space-y-2">
                        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-sm">
                            <span className="flex items-center gap-2"><Music size={16} /> Música de Fundo</span>
                            <Settings size={14} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-sm">
                            <span className="flex items-center gap-2"><Type size={16} /> Legendas</span>
                            <Settings size={14} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-sm">
                            <span className="flex items-center gap-2"><Wand2 size={16} /> Efeitos visuais</span>
                            <Settings size={14} className="text-muted-foreground" />
                        </button>
                    </div>

                    <div className="mt-auto border-t border-border pt-4">
                        <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Timeline</h4>
                        <div className="space-y-2 overflow-y-auto max-h-64 pr-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="flex gap-2 items-center bg-secondary/30 p-2 rounded">
                                    <span className="text-xs font-mono w-4">{i}</span>
                                    <div className="h-8 w-12 bg-primary/20 rounded" />
                                    <div className="flex-1 h-2 bg-border rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-64 right-0 p-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-20">
                <div className="max-w-6xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={() => setStep(7)}
                        className="bg-card/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Voltar
                    </button>
                    <button
                        className="opacity-0 pointer-events-none px-8 py-3"
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepEditor;
