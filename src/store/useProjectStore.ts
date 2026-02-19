import { create } from 'zustand';

export interface Scene {
    id: string;
    content: string; // The script line
    characterIds: string[];
    environmentId?: string;
    imageUrl?: string;
    isGenerating?: boolean;
}

export interface Character {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
}

export interface Environment {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
}

export interface ProjectState {
    currentStep: number;
    script: string;
    scenes: Scene[];
    characters: Character[];
    environments: Environment[];
    style: string;
    aspectRatio: '9:16' | '16:9' | '1:1';

    setStep: (step: number) => void;
    setScript: (script: string) => void;
    setScenes: (scenes: Scene[]) => void;
    addCharacter: (character: Character) => void;
    updateCharacter: (id: string, updates: Partial<Character>) => void;
    updateScene: (id: string, updates: Partial<Scene>) => void;
    setEnvironments: (environments: Environment[]) => void;
    updateEnvironment: (id: string, updates: Partial<Environment>) => void;
    setStyle: (style: string) => void;
    setAspectRatio: (ratio: '9:16' | '16:9' | '1:1') => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    currentStep: 1,
    script: '',
    scenes: [],
    characters: [],
    environments: [],
    style: 'Cinematic',
    aspectRatio: '16:9',

    setStep: (step) => set({ currentStep: step }),
    setScript: (script) => {
        // Basic auto-parsing logic: split by newlines to create initial scenes
        const lines = script.split('\n').filter(line => line.trim().length > 0);
        const newScenes = lines.map((line, index) => ({
            id: `scene-${Date.now()}-${index}`,
            content: line,
            characterIds: [],
        }));
        // Auto-generate environments mock (1 per scene initially or shared)
        const newEnvironments = lines.map((_, index) => ({
            id: `env-${Date.now()}-${index}`,
            name: `Ambiente ${index + 1}`,
            description: 'Descrição do ambiente gerada automaticamente...',
        }));

        // Assign mock environment IDs to scenes
        const scenesWithEnv = newScenes.map((s, i) => ({ ...s, environmentId: newEnvironments[i].id }));

        set({ script, scenes: scenesWithEnv, environments: newEnvironments });
    },
    setScenes: (scenes) => set({ scenes }),
    addCharacter: (character) => set((state) => ({ characters: [...state.characters, character] })),
    updateCharacter: (id, updates) => set((state) => ({
        characters: state.characters.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
    updateScene: (id, updates) => set((state) => ({
        scenes: state.scenes.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
    setEnvironments: (environments) => set({ environments }),
    updateEnvironment: (id, updates) => set((state) => ({
        environments: state.environments.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),
    setStyle: (style) => set({ style }),
    setAspectRatio: (aspectRatio) => set({ aspectRatio }),
}));
