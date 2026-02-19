import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Check, Copy, ExternalLink, ShieldCheck, Database, CreditCard, Clock, User } from 'lucide-react';

const OnboardingPage: React.FC = () => {
    const navigate = useNavigate();
    const { updateUser } = useAuthStore();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [apiKey, setApiKey] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        // Simulate API connection delay
        setTimeout(() => {
            setIsConnecting(false);
            setStep(2); // Move to success step mock
            // In a real app, this would be the OAuth callback or validation
            if (!apiKey) setApiKey('sk-mock-pollinations-key-12345');
        }, 1500);
    };

    const handleFinish = () => {
        updateUser({ apiKey, onboardingCompleted: true });
        navigate('/app/dashboard'); // Go to main app
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                {step === 1 && (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-2 text-center">Conclua suas configurações básicas</h2>
                        <p className="text-muted-foreground text-center mb-8">
                            Comece a utilizar o sistema conectando sua conta.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-secondary/20 p-6 rounded-lg border border-border flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">🌸</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Connect to pollinations.ai</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Authorize Umbra Studio to generate text, images, and video.
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-left text-sm w-full max-w-md mb-6">
                                    <div className="flex items-center gap-2"><User size={16} /> Profile - Read Only</div>
                                    <div className="flex items-center gap-2"><CreditCard size={16} /> Balance - Read Only</div>
                                    <div className="flex items-center gap-2"><Database size={16} /> Usage - Read history</div>
                                    <div className="flex items-center gap-2"><Clock size={16} /> Revoke anytime</div>
                                </div>

                                <button
                                    onClick={handleConnect}
                                    disabled={isConnecting}
                                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-black/80 transition-colors w-full max-w-sm flex items-center justify-center gap-2"
                                >
                                    {isConnecting ? 'Conectando...' : 'Sign in with GitHub'}
                                </button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">Ou use sua chave API manualmente</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Chave API - Pollinations</label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="Cole sua chave API aqui"
                                        className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                    <button onClick={handleConnect} className="bg-secondary text-secondary-foreground h-10 px-4 rounded-md font-medium hover:bg-secondary/80">
                                        Conectar
                                    </button>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <a href="#" className="flex items-center gap-1 hover:text-primary"><ExternalLink size={12} /> Gere sua chave gratuitamente</a>
                                    <a href="#" className="flex items-center gap-1 hover:text-primary"><ExternalLink size={12} /> Vídeo tutorial</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Conectado com sucesso</h2>
                        <p className="text-muted-foreground mb-8">
                            Sua conta Pollinations foi conectada ao Fast Storyboard com sucesso!
                        </p>

                        <div className="flex flex-col gap-4 max-w-xs mx-auto">
                            <button
                                onClick={() => setStep(3)}
                                className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-2 text-center">Cookies ImageFX</h2>
                        <p className="text-muted-foreground text-center mb-8">
                            Extraia seus cookies para funcionalidades avançadas (Opcional).
                        </p>

                        <div className="bg-secondary/20 p-6 rounded-lg border border-border mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Database className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Como extrair?</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Utilize nossa extensão recomendada para extrair os cookies necessários do ImageFX.
                                    </p>
                                    <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                                        <ExternalLink size={14} /> Instalar Extensão Cookies Extractor
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(2)}
                                className="flex-1 bg-secondary text-secondary-foreground h-12 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                            >
                                Voltar
                            </button>
                            <button
                                onClick={handleFinish}
                                className="flex-1 bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Concluir
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress indicators if needed, or simple step dots */}
            <div className="flex gap-2 mt-8">
                <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-primary/20'}`} />
                <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-primary/20'}`} />
                <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-primary/20'}`} />
            </div>
        </div>
    );
};

export default OnboardingPage;
