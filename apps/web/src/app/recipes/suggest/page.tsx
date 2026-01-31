"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChefHat, Sparkles } from "lucide-react";
import Image from "next/image";
import { RecipeCard } from "@/components/RecipeCard";

export default function RecipesSuggestPage() {
    const [showRecipes, setShowRecipes] = useState(false);

    useEffect(() => {
        // 擬似的なローディング/アニメーション遅延
        const timer = setTimeout(() => {
            setShowRecipes(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const dummyRecipes = [
        {
            id: 1,
            title: "豚肉の生姜焼き",
            description: "ジューシーな豚肉に特製生姜ダレが絡む、ご飯が進む定番おかず。",
            imageUrl: "/recipe-ginger-pork.png",
            time: "15分",
            calorie: "320kcal",
            difficulty: "Easy" as const,
        },
        {
            id: 2,
            title: "豚肉と玉ねぎの甘辛炒め",
            description: "冷蔵庫の余り物でサッと作れる！玉ねぎの甘みがアクセント。",
            imageUrl: "/recipe-pork-onion-stirfry.png",
            time: "10分",
            calorie: "290kcal",
            difficulty: "Easy" as const,
        },
        {
            id: 3,
            title: "具だくさん豚汁",
            description: "心も体も温まる、栄養満点のごちそう汁物。",
            imageUrl: "/recipe-pork-soup.png",
            time: "20分",
            calorie: "180kcal",
            difficulty: "Medium" as const,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <header className="w-full p-4 border-b border-white/5 bg-black/20 backdrop-blur-sm z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        href="/inventory/new"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>食材登録へ戻る</span>
                    </Link>
                    <div className="flex items-center gap-2 font-bold text-white">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span>AIシェフのおすすめ</span>
                    </div>
                    <div className="w-16" />
                </div>
            </header>

            <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-10">
                {/* Chef's Message */}
                <div className="flex gap-4 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/50 shriink-0">
                        <Image src="/ai-chef.png" alt="AI Chef" width={48} height={48} className="object-cover" />
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl rounded-tl-none max-w-2xl backdrop-blur-md border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-2">
                            豚肉と玉ねぎですね！<br />
                            それなら、こちらの3品がおすすめです。
                        </h2>
                        <p className="text-gray-300">
                            どれも今の食材で美味しく作れますよ。特に生姜焼きはご飯との相性バツグンです！
                        </p>
                    </div>
                </div>

                {/* Recipe Cards Carousel */}
                <div
                    className={`flex overflow-x-auto pb-8 gap-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent snap-x ${showRecipes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        } transition-all duration-1000 ease-out`}
                >
                    {dummyRecipes.map((recipe, index) => (
                        <div key={recipe.id} className="snap-center" style={{ transitionDelay: `${index * 150}ms` }}>
                            <RecipeCard
                                title={recipe.title}
                                description={recipe.description}
                                imageUrl={recipe.imageUrl}
                                time={recipe.time}
                                calorie={recipe.calorie}
                                difficulty={recipe.difficulty}
                                onSelect={() => window.location.href = `/recipes/${recipe.id}`}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
