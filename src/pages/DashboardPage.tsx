import React from 'react';
import AppLayout from '../components/AppLayout';
import { useProjectStore } from '../store/useProjectStore';

import StepScript from '../components/steps/StepScript';
import StepScenes from '../components/steps/StepScenes';
import StepStyle from '../components/steps/StepStyle';
import StepCharacters from '../components/steps/StepCharacters';
import StepCast from '../components/steps/StepCast';
import StepEnvironments from '../components/steps/StepEnvironments';
import StepStoryboard from '../components/steps/StepStoryboard';
import StepEditor from '../components/steps/StepEditor';

// Step components placeholders
// const StepEnvironments = () => <div>Passo 6: Ambientes</div>; 
// const StepStoryboard = () => <div>Passo 7: Storyboard (Pollinations)</div>;
// const StepEditor = () => <div>Passo 8: Editor</div>;

const DashboardPage: React.FC = () => {
    const { currentStep } = useProjectStore();

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepScript />;
            case 2: return <StepScenes />;
            case 3: return <StepStyle />;
            case 4: return <StepCharacters />;
            case 5: return <StepCast />;
            case 6: return <StepEnvironments />;
            case 7: return <StepStoryboard />;
            case 8: return <StepEditor />;
            default: return <StepScript />;
        }
    };

    return (
        <AppLayout>
            {renderStep()}
        </AppLayout>
    );
};

export default DashboardPage;
