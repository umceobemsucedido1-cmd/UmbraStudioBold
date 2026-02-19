import React, { useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { Image as ImageIcon, Wand2 } from 'lucide-react';

const StepEnvironments: React.FC = () => {
    const { scenes, environments, updateEnvironment, setStep } = useProjectStore();
    const [isGenerating, setIsGenerating] = useState<string | null>(null);

    const handleGenerateValues = (envId: string) => {
        setIsGenerating(envId);
        setTimeout(() => {
            updateEnvironment(envId, {
                description: `Ambiente detalhado com iluminação dramática e texturas realistas... (Gerado por IA)`,
                imageUrl: `https://picsum.photos/seed/${envId}/800/450`
            });
            setIsGenerating(null);
        }, 2000);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 6: Ambientes</h2>
                <p className="text-muted-foreground">Configure o ambiente das cenas. Ajuste descrições e deixe tudo consistente.</p>
            </div>

            <div className="space-y-6">
                {environments.map((env) => {
                    // Find scenes using this environment
                    const relatedScenes = scenes.filter(s => s.environmentId === env.id);

                    return (
                        <div key={env.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-64 aspect-video bg-secondary rounded-lg overflow-hidden flex-shrink-0 relative group">
                                {env.imageUrl ? (
                                    <img src={env.imageUrl} alt={env.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <ImageIcon size={32} />
                                        <span className="text-xs">Sem imagem</span>
                                    </div>
                                )}
                                {/* Overlay actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleGenerateValues(env.id)}
                                        className="text-white bg-primary px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-primary/90"
                                    >
                                        <Wand2 size={12} className={isGenerating === env.id ? "animate-spin" : ""} />
                                        Gerar
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-lg">{env.name}</h3>
                                    <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
                                        Usado em: {relatedScenes.map((_, i) => `Cena ${scenes.indexOf(relatedScenes[i]) + 1}`).join(', ')}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Descrição do Ambiente</label>
                                    <textarea
                                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                        value={env.description}
                                        onChange={(e) => updateEnvironment(env.id, { description: e.target.value })}
                                        placeholder="Descreva o local, iluminação, atmosfera..."
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="fixed bottom-0 left-64 right-0 p-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-20">
                <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={() => setStep(5)}
                        className="bg-card/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => setStep(7)}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/25"
                    >
                        Próximo: Storyboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepEnvironments;
