import React from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';

interface SortableSceneItemProps {
    id: string;
    index: number;
    content: string;
    onDelete: (id: string) => void;
}

const SortableSceneItem = ({ id, content, index, onDelete }: SortableSceneItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex gap-4 items-start group relative">
            <div className="pt-4 text-muted-foreground font-mono text-sm w-6 text-right select-none">{index + 1}</div>
            <div className="flex-1 bg-card border border-border rounded-xl p-4 flex gap-3 shadow-sm group-hover:border-primary/50 transition-colors">
                <div {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground mt-1 touch-none">
                    <GripVertical size={20} />
                </div>
                <textarea
                    className="flex-1 bg-transparent resize-none focus:outline-none min-h-[4rem]"
                    defaultValue={content}
                    readOnly // For now
                />
                <button
                    onClick={() => onDelete(id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1 opacity-0 group-hover:opacity-100"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

const StepScenes: React.FC = () => {
    const { scenes, setScenes, setStep } = useProjectStore();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = scenes.findIndex((s) => s.id === active.id);
            const newIndex = scenes.findIndex((s) => s.id === over?.id);
            setScenes(arrayMove(scenes, oldIndex, newIndex));
        }
    };

    const handleDelete = (id: string) => {
        setScenes(scenes.filter(s => s.id !== id));
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passo 2: Organizar Cenas</h2>
                    <p className="text-muted-foreground">Edite, reordene ou exclua cenas.</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-medium text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors">
                    <Plus size={16} /> Adicionar Cena
                </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={scenes} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                        {scenes.map((scene, index) => (
                            <SortableSceneItem key={scene.id} id={scene.id} content={scene.content} index={index} onDelete={handleDelete} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {scenes.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    Nenhuma cena encontrada. Volte ao roteiro para criar seu conteúdo.
                </div>
            )}

            <div className="fixed bottom-0 left-64 right-0 p-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-20">
                <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={() => setStep(1)}
                        className="bg-card/80 backdrop-blur border border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => setStep(3)}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/25"
                    >
                        Próximo: Estilo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepScenes;
