import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
            <div className="absolute left-0 top-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

            <div className="w-full max-w-md p-8 bg-card border border-border rounded-xl shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                        <Film className="text-primary" /> Umbra Studio Bold
                    </Link>
                    <h2 className="text-xl font-semibold text-foreground">Bem-vindo de volta</h2>
                    <p className="text-sm text-muted-foreground">Entre para continuar seus projetos</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email</label>
                        <input
                            type="email"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Senha</label>
                        <input
                            type="password"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Entrar'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Não tem uma conta? </span>
                    <Link to="/signup" className="font-medium text-primary hover:underline">
                        Cadastre-se
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
