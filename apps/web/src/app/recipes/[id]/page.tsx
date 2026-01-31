"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Flame, Users, ChefHat, CheckCircle2, Circle, Play } from "lucide-react";

// モックデータ（本来はDBやAPIから取得）
const MOCK_RECIPES = {
    "1": {
        id: "1",
        title: "豚肉の生姜焼き",
        description: "ジューシーな豚肉に特製生姜ダレが絡む、ご飯が進む定番おかず。",
        imageUrl: "/recipe-ginger-pork.png",
        time: "15分",
        calorie: "320kcal",
        difficulty: "Easy",
        servings: "2人分",
        ingredients: [
            { name: "豚ロース肉 (薄切り)", amount: "200g", inStock: true },
            { name: "玉ねぎ", amount: "1/2個", inStock: true },
            { name: "生姜 (すりおろし)", amount: "1かけ", inStock: false },
            { name: "醤油", amount: "大さじ2", inStock: true },
            { name: "酒", amount: "大さじ2", inStock: true },
            { name: "みりん", amount: "大さじ2", inStock: true },
            { name: "キャベツ (千切り)", amount: "適量", inStock: false },
        ],
        steps: [
            {
                order: 1,
                text: "玉ねぎはくし形に切り、豚肉は食べやすい大きさに切る。生姜はすりおろしておく。",
            },
            {
                order: 2,
                text: "ボウルに醤油、酒、みりん、すりおろし生姜を混ぜ合わせ、タレを作る。",
            },
            {
                order: 3,
                text: "フライパンに油を熱し、豚肉を中火で焼く。色が変わったら玉ねぎを加えて炒める。",
            },
            {
                order: 4,
                text: "玉ねぎがしんなりしたら、合わせたタレを加え、全体に絡めながら少し煮詰める。",
            },
            {
                order: 5,
                text: "皿に千切りキャベツと共に盛り付けて完成。",
            },
        ],
    },
    "2": {
        id: "2",
        title: "豚肉と玉ねぎの甘辛炒め",
        description: "冷蔵庫の余り物でサッと作れる！玉ねぎの甘みがアクセント。",
        imageUrl: "/recipe-pork-onion-stirfry.png",
        time: "10分",
        calorie: "290kcal",
        difficulty: "Easy",
        servings: "2人分",
        ingredients: [
            { name: "豚こま切れ肉", amount: "200g", inStock: true },
            { name: "玉ねぎ", amount: "1個", inStock: true },
            { name: "砂糖", amount: "大さじ1", inStock: true },
            { name: "醤油", amount: "大さじ1.5", inStock: true },
            { name: "ごま油", amount: "小さじ1", inStock: true },
        ],
        steps: [
            { order: 1, text: "玉ねぎは1cm幅のくし切りにする。" },
            { order: 2, text: "フライパンにごま油を熱し、豚肉を炒める。" },
            { order: 3, text: "肉の色が変わったら玉ねぎを加え、透き通るまで炒める。" },
            { order: 4, text: "砂糖、醤油を加え、汁気がなくなるまで炒め合わせる。" },
        ],
    },
    "3": {
        id: "3",
        title: "具だくさん豚汁",
        description: "心も体も温まる、栄養満点のごちそう汁物。",
        imageUrl: "/recipe-pork-soup.png",
        time: "20分",
        calorie: "180kcal",
        difficulty: "Medium",
        servings: "4人分",
        ingredients: [
            { name: "豚バラ肉", amount: "100g", inStock: true },
            { name: "大根", amount: "5cm", inStock: false },
            { name: "人参", amount: "1/2本", inStock: false },
            { name: "ごぼう", amount: "1/2本", inStock: false },
            { name: "こんにゃく", amount: "1/2枚", inStock: false },
            { name: "だし汁", amount: "800ml", inStock: true },
            { name: "味噌", amount: "大さじ4", inStock: true },
        ],
        steps: [
            { order: 1, text: "野菜は食べやすい大きさに切る。ごぼうはささがきにして水にさらす。" },
            { order: 2, text: "鍋にごま油（分量外）を熱し、豚肉と野菜を炒める。" },
            { order: 3, text: "だし汁を加え、野菜が柔らかくなるまで煮る。アクが出たら取る。" },
            { order: 4, text: "火を弱め、味噌を溶き入れて完成。お好みでねぎを散らす。" },
        ],
    },
};

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15+ (App Router) では params は Promise として扱われる場合があるため、React.use() で展開
    // ただし、TSのバージョンやNext.jsのバージョンによっては await が必要な場合もあるが、
    // Client Component であれば use() フックの使用が推奨されるパターンもある。
    // ここではシンプルに Promise として型定義し、use() でアンラップする形をとる。
    const { id } = use(params);

    const recipe = MOCK_RECIPES[id as keyof typeof MOCK_RECIPES];

    if (!recipe) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">レシピが見つかりません</h1>
                    <Link href="/recipes/suggest" className="text-purple-400 hover:underline">
                        一覧に戻る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative pb-20">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-96 overflow-hidden -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover opacity-50 blur-sm scale-110"
                />
            </div>

            <header className="fixed top-0 w-full p-4 z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/recipes/suggest"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md hover:bg-black/60"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">戻る</span>
                    </Link>
                </div>
            </header>

            <main className="pt-24 px-4 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/2 aspect-video md:aspect-square relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                        <Image
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority
                        />
                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-sm text-white font-medium border border-white/10 flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-orange-400" />
                            {recipe.difficulty}
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                {recipe.title}
                            </h1>
                            <p className="text-gray-300 leading-relaxed">
                                {recipe.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-gray-300">
                                <Clock className="w-4 h-4" />
                                <span>{recipe.time}</span>
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-gray-300">
                                <Users className="w-4 h-4" />
                                <span>{recipe.servings}</span>
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-gray-300">
                                <span className="font-bold text-sm">CAL</span>
                                <span>{recipe.calorie}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                                <ChefHat className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm text-purple-200">
                                豚肉と玉ねぎは相性抜群！ビタミンB1も豊富で疲労回復にもぴったりですよ。
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2 Column Layout for Ingredients and Steps */}
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mt-8">

                    {/* Ingredients Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                            材料 <span className="text-sm font-normal text-gray-400">({recipe.servings})</span>
                        </h2>
                        <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        {ingredient.inStock ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-600 shrink-0" />
                                        )}
                                        <span className={ingredient.inStock ? "text-white" : "text-gray-400"}>
                                            {ingredient.name}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-sm">{ingredient.amount}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            <CheckCircle2 className="w-3 h-3 text-green-500 inline mr-1" />
                            は冷蔵庫にある食材です
                        </p>
                    </div>

                    {/* Steps Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                            作り方
                        </h2>
                        <div className="space-y-6">
                            {recipe.steps.map((step) => (
                                <div key={step.order} className="flex gap-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm shrink-0">
                                            {step.order}
                                        </div>
                                        {step.order !== recipe.steps.length && (
                                            <div className="w-0.5 h-full bg-white/10 min-h-[20px]" />
                                        )}
                                    </div>
                                    <div className="pb-6">
                                        <p className="text-gray-200 leading-relaxed md:pt-1">
                                            {step.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Floating Action Button */}
                <div className="fixed bottom-6 left-0 w-full px-4 z-40 pointer-events-none">
                    <div className="max-w-4xl mx-auto flex justify-end pointer-events-auto">
                        <button
                            className="px-8 py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-900/40 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group cursor-not-allowed opacity-80"
                            title="次のアップデートで実装予定！"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            <span>調理を開始する</span>
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}
