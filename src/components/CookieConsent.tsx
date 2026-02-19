import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:p-6 shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Política de Cookies</h3>
                    <p className="text-muted-foreground text-sm">
                        Utilizamos cookies essenciais para o funcionamento da plataforma e para melhorar sua experiência. Ao continuar navegando, você concorda com nossa Política de Privacidade.
                    </p>
                </div>
                <button
                    onClick={handleAccept}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                    Aceitar
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
