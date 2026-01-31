"use client";

import { Check, Edit2, Plus, Trash2, X } from "lucide-react";

type Ingredient = {
    id: string;
    name: string;
    amount: string;
    category?: string;
};

type IngredientPreviewProps = {
    ingredients: Ingredient[];
    onRemove: (id: string) => void;
    onConfirm: () => void;
};

export const IngredientPreview = ({
    ingredients,
    onRemove,
    onConfirm,
}: IngredientPreviewProps) => {
    if (ingredients.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-lg font-medium mb-2">リストは空です</p>
                <p className="text-sm">シェフに買ったものを伝えると<br />ここにリストアップされます</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h3 className="font-bold text-white flex items-center gap-2">
                    検出された食材
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
                        {ingredients.length}
                    </span>
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/20">
                {ingredients.map((item) => (
                    <div
                        key={item.id}
                        className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all animate-in zoom-in-95 duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xl shadow-inner border border-white/5">
                                {getIconForCategory(item.name)}
                            </div>
                            <div>
                                <p className="font-medium text-white">{item.name}</p>
                                <p className="text-xs text-gray-400">{item.amount}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onRemove(item.id)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                title="削除"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
                <button
                    onClick={onConfirm}
                    className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                    <Check className="w-5 h-5" />
                    リストを確定して登録
                </button>
            </div>
        </div>
    );
};

// 簡易的なアイコン振り分けロジック (デモ用)
const getIconForCategory = (name: string) => {
    if (name.includes("肉") || name.includes("豚") || name.includes("牛") || name.includes("鶏")) return "🍖";
    if (name.includes("魚") || name.includes("鮭") || name.includes("鯖")) return "🐟";
    if (name.includes("野菜") || name.includes("ジン") || name.includes("ネギ") || name.includes("菜")) return "🥬";
    if (name.includes("卵") || name.includes("たまご")) return "🥚";
    if (name.includes("乳") || name.includes("牛乳") || name.includes("チーズ")) return "🧀";
    if (name.includes("果") || name.includes("りんご") || name.includes("バナナ")) return "🍎";
    return "📦";
};
