import React, { useState } from 'react';
import { useProjectStore, type Character } from '../../store/useProjectStore';
import { Plus, User, RefreshCw } from 'lucide-react';

const StepCharacters: React.FC = () => {
    const { characters, addCharacter, updateCharacter, setStep } = useProjectStore();
    const [isGenerating, setIsGenerating] = useState<string | null>(null);

    const handleCreate = () => {
        const newChar: Character = {
            id: `char-${Date.now()}`,
            name: `Personagem ${characters.length + 1}`,
            description: 'Uma descrição breve do personagem...',
            imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}` // Mock placeholder
        };
        addCharacter(newChar);
    };

    const handleGenerateImage = (id: string) => {
        setIsGenerating(id);
        setTimeout(() => {
            // Mock generation
            updateCharacter(id, { imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}-${Date.now()}` });
            setIsGenerating(null);
        }, 2000);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 4: Personagens</h2>
                    <p className="text-muted-foreground">Identifique e configure os personagens da história.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus size={16} /> Novo personagem
                </button>
            </div>

            <div className="space-y-6">
                {characters.map((char) => (
                    <div key={char.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-full md:w-48 h-48 bg-secondary rounded-lg overflow-hidden flex-shrink-0 relative group">
                            {char.imageUrl ? (
                                <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <User size={48} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleGenerateImage(char.id)}
                                    className="text-white bg-primary p-2 rounded-full hover:bg-primary/90"
                                    title="Regenerar"
                                >
                                    <RefreshCw size={20} className={isGenerating === char.id ? "animate-spin" : ""} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Nome do personagem</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={char.name}
                                    onChange={(e) => updateCharacter(char.id, { name: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Prompt / Descrição</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                    value={char.description}
                                    onChange={(e) => updateCharacter(char.id, { description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {characters.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <User size={32} />
                        </div>
                        <h3 className="text-lg font-medium mb-1">Nenhum personagem criado</h3>
                        <p className="text-muted-foreground mb-4">Adicione personagens para compor sua história.</p>
                        <button
                            onClick={handleCreate}
                            className="text-primary font-medium hover:underline"
                        >
                            Criar primeiro personagem
                        </button>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-64 right-0 p-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-20">
                <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={() => setStep(3)}
                        className="bg-card/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => setStep(5)}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/25"
                    >
                        Próximo: Elenco
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepCharacters;
