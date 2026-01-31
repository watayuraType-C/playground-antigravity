import { RecipeSuggestion as RecipeSuggestionType } from '@/lib/api';
import { ChefHat, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface RecipeSuggestionProps {
    suggestion: RecipeSuggestionType | null;
    loading: boolean;
}

export function RecipeSuggestion({ suggestion, loading }: RecipeSuggestionProps) {
    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-500">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <ChefHat className="w-8 h-8 text-primary animate-bounce" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">レシピを考案中...</h3>
                <p>シェフがあなたの食材から最高のレシピを考えています</p>
            </div>
        );
    }

    if (!suggestion) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                <Sparkles className="w-12 h-12 mb-4 text-slate-300" />
                <h3 className="text-lg font-medium text-slate-900">レシピを提案</h3>
                <p className="mt-2 max-w-xs mx-auto">
                    左側のリストから食材を選択して、<br />
                    あなたのためのオリジナルレシピを提案してもらいましょう
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-secondary to-orange-400 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{suggestion.name}</h2>
                <p className="opacity-90">{suggestion.description}</p>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        材料
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestion.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-2 rounded-lg">
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                {ing}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-secondary rounded-full" />
                        作り方
                    </h3>
                    <div className="space-y-4">
                        {suggestion.instructions.map((inst, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                                    {i + 1}
                                </div>
                                <p className="pt-1 text-slate-700 leading-relaxed">{inst}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
