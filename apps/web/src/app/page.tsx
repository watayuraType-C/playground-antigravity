'use client';

import { useEffect, useState } from 'react';
import { api, Ingredient, RecipeSuggestion as RecipeSuggestionType } from '@/lib/api';
import { Header } from '@/components/Header';
import { IngredientCard } from '@/components/IngredientCard';
import { AddIngredientForm } from '@/components/AddIngredientForm';
import { RecipeSuggestion } from '@/components/RecipeSuggestion';
import { ChefHat, RefreshCcw } from 'lucide-react';

export default function Home() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [suggestion, setSuggestion] = useState<RecipeSuggestionType | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchIngredients = async () => {
        try {
            const data = await api.ingredients.list();
            setIngredients(data);
        } catch (error) {
            console.error('Failed to fetch ingredients', error);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const handleGetRecipe = async () => {
        if (selectedIds.size === 0) return;
        setLoading(true);
        try {
            const selectedNames = ingredients
                .filter(i => selectedIds.has(i.id))
                .map(i => i.name);

            const result = await api.recipes.suggest(selectedNames);
            setSuggestion(result);
        } catch (error) {
            console.error(error);
            alert('レシピの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Inventory */}
                    <div className="lg:col-span-5 space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                在庫管理
                                <span className="text-sm font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                                    {ingredients.length}
                                </span>
                                <button
                                    onClick={fetchIngredients}
                                    className="ml-auto p-1.5 text-slate-400 hover:text-primary transition-colors"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                </button>
                            </h2>

                            <div className="space-y-4">
                                <AddIngredientForm onAdded={fetchIngredients} />

                                <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                    {ingredients.length === 0 ? (
                                        <div className="text-center py-8 text-slate-400">
                                            在庫がありません
                                        </div>
                                    ) : (
                                        ingredients.map(ing => (
                                            <IngredientCard
                                                key={ing.id}
                                                ingredient={ing}
                                                selected={selectedIds.has(ing.id)}
                                                onToggle={toggleSelection}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Recipe Suggestion */}
                    <div className="lg:col-span-7">
                        <section className="h-full flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <ChefHat className="w-5 h-5 text-secondary" />
                                    シェフの提案
                                </h2>
                                <button
                                    onClick={handleGetRecipe}
                                    disabled={selectedIds.size === 0 || loading}
                                    className="bg-secondary hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-orange-200 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                                >
                                    {loading ? '考案中...' : `${selectedIds.size}個の食材でレシピを提案`}
                                </button>
                            </div>

                            <div className="flex-1 min-h-[500px]">
                                <RecipeSuggestion suggestion={suggestion} loading={loading} />
                            </div>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
}
