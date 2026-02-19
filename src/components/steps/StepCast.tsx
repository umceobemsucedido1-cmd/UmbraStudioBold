import React from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { User, Check } from 'lucide-react';

const StepCast: React.FC = () => {
    const { scenes, characters, setScenes, setStep } = useProjectStore();

    const toggleCharacterInScene = (sceneId: string, charId: string) => {
        setScenes(scenes.map(scene => {
            if (scene.id === sceneId) {
                const isPresent = scene.characterIds.includes(charId);
                return {
                    ...scene,
                    characterIds: isPresent
                        ? scene.characterIds.filter(id => id !== charId)
                        : [...scene.characterIds, charId].slice(0, 4) // Max 4 per scene
                };
            }
            return scene;
        }));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 5: Elenco</h2>
                <p className="text-muted-foreground">Defina quais personagens aparecem em cada cena (até 4 por cena).</p>
            </div>

            <div className="space-y-4">
                {scenes.map((scene, index) => (
                    <div key={scene.id} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-secondary px-2 py-1 rounded text-xs font-mono font-medium">Cena {index + 1}</div>
                            <p className="text-sm font-medium line-clamp-2 flex-1 italic">"{scene.content}"</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {characters.map(char => {
                                const isSelected = scene.characterIds.includes(char.id);
                                return (
                                    <button
                                        key={char.id}
                                        onClick={() => toggleCharacterInScene(scene.id, char.id)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm
                      ${isSelected
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'border-border hover:border-primary/50 text-muted-foreground'
                                            }
                    `}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-secondary overflow-hidden">
                                            {char.imageUrl ? (
                                                <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={12} className="m-1" />
                                            )}
                                        </div>
                                        <span>{char.name}</span>
                                        {isSelected && <Check size={14} />}
                                    </button>
                                );
                            })}
                            {characters.length === 0 && (
                                <p className="text-xs text-muted-foreground">Nenhum personagem disponível. Volte ao passo anterior para criar personagens.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-64 right-0 p-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-20">
                <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={() => setStep(4)}
                        className="bg-card/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => setStep(6)}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/25"
                    >
                        Próximo: Ambientes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepCast;
