'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';

interface AddIngredientFormProps {
    onAdded: () => void;
}

export function AddIngredientForm({ onAdded }: AddIngredientFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        unit: '個',
        category: '野菜',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.ingredients.create({
                ...formData,
                quantity: Number(formData.quantity),
            });
            setFormData({ name: '', quantity: '', unit: '個', category: '野菜' });
            onAdded();
        } catch (error) {
            console.error('Failed to add ingredient:', error);
            alert('食材の追加に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-100 space-y-4">
            <h3 className="font-semibold text-slate-900 mb-2">食材を追加</h3>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">名前</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="例: たまねぎ"
                    />
                </div>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">数量</label>
                        <input
                            type="number"
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={formData.quantity}
                            onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        />
                    </div>
                    <div className="w-24">
                        <label className="block text-sm font-medium text-slate-700 mb-1">単位</label>
                        <select
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                            value={formData.unit}
                            onChange={e => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                        >
                            <option>個</option>
                            <option>本</option>
                            <option>束</option>
                            <option>パック</option>
                            <option>枚</option>
                            <option>g</option>
                            <option>ml</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">カテゴリ</label>
                    <select
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                        value={formData.category}
                        onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    >
                        <option>野菜</option>
                        <option>肉</option>
                        <option>魚介</option>
                        <option>乳製品</option>
                        <option>穀物</option>
                        <option>調味料</option>
                        <option>その他</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
                <Plus className="w-4 h-4" />
                {loading ? '追加中...' : '在庫に追加'}
            </button>
        </form>
    );
}
