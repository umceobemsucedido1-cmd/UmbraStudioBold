import React from 'react';
import { useNavigate } from 'react-router-dom';
import CookieConsent from '../components/CookieConsent';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />

            <div className="w-full max-w-md space-y-8 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Umbra Studio Bold
                    </h1>
                    <p className="text-muted-foreground">
                        Crie histórias incríveis com o poder da IA.
                    </p>
                </div>

                <div className="grid gap-4 w-full">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Entrar no Studio
                    </button>
                </div>
            </div>

            <CookieConsent />
        </div>
    );
};

export default LandingPage;
