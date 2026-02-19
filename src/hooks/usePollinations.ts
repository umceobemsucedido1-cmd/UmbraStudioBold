import { useState, useCallback } from 'react';

interface PollinationsOptions {
    width?: number;
    height?: number;
    seed?: number;
    model?: string;
}

export const usePollinations = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImage = useCallback((prompt: string, options: PollinationsOptions = {}) => {
        const {
            width = 1024,
            height = 1024,
            seed = Math.floor(Math.random() * 1000000),
            model = 'flux' // Default to flux or latest model
        } = options;

        const encodedPrompt = encodeURIComponent(prompt);
        // Using pollinations.ai image URL structure
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=${model}`;

        return url;
    }, []);

    const generateText = useCallback(async (prompt: string, systemPrompt: string = "You are a creative assistant.") => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://text.pollinations.ai/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    model: 'openai', // Pollinations text model
                    seed: Math.floor(Math.random() * 1000000),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate text');
            }

            const data = await response.text();
            return data;
        } catch (err: any) {
            setError(err.message || 'Error generating text');
            console.error(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        generateImage,
        generateText,
        isLoading,
        error
    };
};
