import { Ingredient } from '@/lib/api';
import { Package, Utensils, Wheat, Carrot, Milk, Beef } from 'lucide-react';
import clsx from 'clsx';

const CATEGORY_ICONS: Record<string, any> = {
    '野菜': Carrot,
    '肉': Beef,
    '乳製品': Milk,
    '穀物': Wheat,
    'その他': Package,
};

interface IngredientCardProps {
    ingredient: Ingredient;
    selected: boolean;
    onToggle: (id: string) => void;
}

export function IngredientCard({ ingredient, selected, onToggle }: IngredientCardProps) {
    const Icon = CATEGORY_ICONS[ingredient.category] || Package;

    return (
        <div
            onClick={() => onToggle(ingredient.id)}
            className={clsx(
                "cursor-pointer transition-all duration-200 border rounded-xl p-4 flex items-center gap-4 hover:shadow-md",
                selected
                    ? "bg-primary/5 border-primary ring-1 ring-primary"
                    : "bg-white border-slate-100"
            )}
        >
            <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center",
                selected ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
            )}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h3 className="font-medium text-slate-900">{ingredient.name}</h3>
                <p className="text-sm text-slate-500">
                    {ingredient.quantity} {ingredient.unit}
                </p>
            </div>
            <div className="ml-auto">
                <div className={clsx(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    selected
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 bg-transparent"
                )}>
                    {selected && <Utensils className="w-3 h-3" />}
                </div>
            </div>
        </div>
    );
}
