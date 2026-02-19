import React, { useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { Play, Download, RefreshCw, Edit2 } from 'lucide-react';

// Helper to construct Pollinations URL
const getPollinationsUrl = (prompt: string, seed: number, width: number, height: number) => {
    const encodedPrompt = encodeURIComponent(prompt);
    // Pollinations URL format: https://pollinations.ai/p/{prompt}?width={width}&height={height}&seed={seed}&model={model}
    // Using image.pollinations.ai for direct image
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
};

const StepStoryboard: React.FC = () => {
    const { scenes, style, aspectRatio, setStep } = useProjectStore();
    const [generatingAll, setGeneratingAll] = useState(false);

    const [refresher, setRefresher] = useState<Record<string, number>>({});

    const handleRefresh = (sceneId: string) => {
        setRefresher(prev => ({ ...prev, [sceneId]: (prev[sceneId] || 0) + 1 }));
    };

    const handleGenerateAll = () => {
        setGeneratingAll(true);
        // In a real app, this would trigger batch generation logic
        setTimeout(() => setGeneratingAll(false), 2000);
    };

    const width = aspectRatio === '16:9' ? 1280 : aspectRatio === '9:16' ? 720 : 1024;
    const height = aspectRatio === '16:9' ? 720 : aspectRatio === '9:16' ? 1280 : 1024;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 7: Storyboard</h2>
                    <p className="text-muted-foreground">Edite e anime as imagens que deseja. A miniatura escolhida vira base do vídeo final.</p>
                </div>
                <button
                    onClick={handleGenerateAll}
                    disabled={generatingAll}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Play size={16} /> {generatingAll ? 'Gerando...' : 'Animar tudo'}
                </button>
            </div>

            <div className="grid gap-8">
                {scenes.map((scene, index) => {
                    // Construct prompt
                    const seed = index * 123 + (refresher[scene.id] || 0); // Deterministic prompt but refreshable
                    const prompt = `${style} style. ${scene.content}. detailed, high quality, cinematic lighting`;
                    const imageUrl = getPollinationsUrl(prompt, seed, width, height); // using 'flux' as generic model placeholder

                    return (
                        <div key={scene.id} className="flex flex-col md:flex-row gap-6 bg-card border border-border rounded-xl p-6">
                            <div className="w-full md:w-1/3 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                                    <span className="font-semibold text-sm">Cena {index + 1}</span>
                                </div>
                                <p className="text-sm italic text-muted-foreground border-l-2 border-border pl-3">
                                    "{scene.content}"
                                </p>

                                <div className="pt-4">
                                    <label className="text-xs font-semibold uppercase text-muted-foreground">Prompt Completo</label>
                                    <div className="bg-secondary/50 p-2 rounded text-xs font-mono text-muted-foreground mt-1 break-words">
                                        {prompt}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-2/3 space-y-3">
                                <div className="aspect-video bg-black rounded-lg overflow-hidden relative group border border-border">
                                    <img
                                        src={imageUrl}
                                        alt={`Scene ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleRefresh(scene.id)}
                                            className="bg-white/20 hover:bg-white/30 backdrop-blur text-white p-3 rounded-full transition-colors"
                                            title="Regenerar"
                                        >
                                            <RefreshCw size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button className="text-xs flex items-center gap-1 bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded transition-colors">
                                        <Edit2 size={12} /> Editar com IA
                                    </button>
                                    <button className="text-xs flex items-center gap-1 bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded transition-colors">
                                        <Download size={12} /> Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="fixed bottom-0 left-64 right-0 p-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-20">
                <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={() => setStep(6)}
                        className="bg-card/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => setStep(8)}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/25"
                    >
                        Próximo: Editar Vídeo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepStoryboard;
