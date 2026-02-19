import React from 'react';
import { useProjectStore } from '../store/useProjectStore';
import {
    FileText, Layers, Palette, Users,
    Video, Image as ImageIcon, Briefcase, Film,
    LogOut, Settings
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface AppLayoutProps {
    children: React.ReactNode;
}

const steps = [
    { id: 1, name: 'Roteiro', icon: FileText },
    { id: 2, name: 'Cenas', icon: Layers },
    { id: 3, name: 'Estilo', icon: Palette },
    { id: 4, name: 'Personagens', icon: Users },
    { id: 5, name: 'Elenco', icon: Briefcase },
    { id: 6, name: 'Ambientes', icon: ImageIcon }, // Using Image as Environment placeholder
    { id: 7, name: 'Storyboard', icon: Video },
    { id: 8, name: 'Edição', icon: Film },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { currentStep, setStep } = useProjectStore();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-card flex flex-col">
                <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Umbra Studio Bold
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setStep(step.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }
                  ${isCompleted ? 'text-primary/80' : ''}
                `}
                            >
                                <div className={`
                  w-6 h-6 rounded-md flex items-center justify-center text-xs border
                  ${isActive
                                        ? 'border-primary-foreground/30 bg-primary-foreground/10'
                                        : 'border-border bg-background'
                                    }
                `}>
                                    {step.id}
                                </div>
                                {step.name}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <LinkButton icon={Settings} label="Configurações" />
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                        <LogOut size={16} />
                        Sair
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold text-foreground">
                        {steps.find(s => s.id === currentStep)?.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                            Projeto sem título
                        </span>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-6 relative">
                    <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

const LinkButton = ({ icon: Icon, label, onClick }: any) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
        <Icon size={16} />
        {label}
    </button>
);

export default AppLayout;
