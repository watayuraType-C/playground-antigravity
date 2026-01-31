"use client";

import { Clock, Flame, Users } from "lucide-react";
import Image from "next/image";

type RecipeCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    time: string;
    calorie: string;
    difficulty: "Easy" | "Medium" | "Hard";
    onSelect: () => void;
};

export const RecipeCard = ({
    title,
    description,
    imageUrl,
    time,
    calorie,
    difficulty,
    onSelect,
}: RecipeCardProps) => {
    return (
        <div className="group relative w-[280px] md:w-[320px] shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/20 cursor-pointer flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs text-white font-medium border border-white/10 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {difficulty}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                    {description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>2人分</span>
                    </div>
                    <div>{calorie}</div>
                </div>

                <button
                    onClick={onSelect}
                    className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                    詳細を見る
                </button>
            </div>
        </div>
    );
};
