import React from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { Smartphone, Monitor, Square } from 'lucide-react';

const styles = [
    { id: 'cinematic', name: 'Cinematic', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80' },
    { id: 'anime', name: 'Anime', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80' },
    { id: '3d-render', name: '3D Render', image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=400&q=80' },
    { id: 'painting', name: 'Painting', image: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c15?w=400&q=80' },
    { id: 'comic', name: 'Comic Book', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80' },
    { id: 'pixel', name: 'Pixel Art', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80' },
    { id: 'low-poly', name: 'Low Poly', image: 'https://images.unsplash.com/photo-1621245749710-186e24747230?w=400&q=80' },
    { id: 'neon', name: 'Neon Cyberpunk', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80' },
];

const StepStyle: React.FC = () => {
    const { style, setStyle, aspectRatio, setAspectRatio, setStep } = useProjectStore();

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 3: Estilo e Formato</h2>
                <p className="text-muted-foreground">Escolha a proporção e o estilo visual do seu vídeo.</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Formato da Imagem</h3>
                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={() => setAspectRatio('9:16')}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${aspectRatio === '9:16' ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'}`}
                    >
                        <Smartphone size={32} className="mb-2" />
                        <span className="font-medium">9:16</span>
                        <span className="text-xs text-muted-foreground">Stories/Reels/TikTok</span>
                    </button>
                    <button
                        onClick={() => setAspectRatio('1:1')}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${aspectRatio === '1:1' ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'}`}
                    >
                        <Square size={32} className="mb-2" />
                        <span className="font-medium">1:1</span>
                        <span className="text-xs text-muted-foreground">Instagram Feed</span>
                    </button>
                    <button
                        onClick={() => setAspectRatio('16:9')}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${aspectRatio === '16:9' ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'}`}
                    >
                        <Monitor size={32} className="mb-2" />
                        <span className="font-medium">16:9</span>
                        <span className="text-xs text-muted-foreground">YouTube</span>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Estilo Visual</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {styles.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setStyle(s.name)}
                            className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${style === s.name ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-transparent'}`}
                        >
                            <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                                <span className="text-white font-medium">{s.name}</span>
                            </div>
                            {style === s.name && (
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-0 left-64 right-0 p-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-20">
                <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={() => setStep(2)}
                        className="bg-card/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => setStep(4)}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/25"
                    >
                        Próximo: Personagens
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepStyle;
