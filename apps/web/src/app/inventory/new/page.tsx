"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChefHat } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { IngredientPreview } from "@/components/IngredientPreview";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

type Ingredient = {
    id: string;
    name: string;
    amount: string;
};

export default function InventoryNewPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "おかえりなさい！買い物お疲れ様でした。何を買ってきましたか？",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsSending(true);

        // デモ用の擬似的な処理
        // 本来はここでLLM APIを叩いて食材抽出を行う
        setTimeout(() => {
            // 簡易的なキーワード抽出デモ
            const newIngredients: Ingredient[] = [];
            const text = newUserMessage.content;

            if (text.includes("肉")) newIngredients.push({ id: Date.now().toString() + "1", name: "豚肉", amount: "300g" });
            if (text.includes("人参") || text.includes("ニンジン")) newIngredients.push({ id: Date.now().toString() + "2", name: "人参", amount: "3本" });
            if (text.includes("玉ねぎ") || text.includes("タマネギ")) newIngredients.push({ id: Date.now().toString() + "3", name: "玉ねぎ", amount: "2個" });
            if (text.includes("牛乳")) newIngredients.push({ id: Date.now().toString() + "4", name: "牛乳", amount: "1本" });
            if (text.includes("卵") || text.includes("たまご")) newIngredients.push({ id: Date.now().toString() + "5", name: "卵", amount: "1パック" });

            if (newIngredients.length > 0) {
                setIngredients((prev) => [...prev, ...newIngredients]);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: `了解です！${newIngredients.map(i => i.name).join("と")}をリストに追加しました。他にはありますか？`,
                    },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: "なるほど。具体的な食材名と数量を教えてもらえると助かります！（例：豚肉300g）",
                    },
                ]);
            }
            setIsSending(false);
        }, 1000);
    };

    const handleRemoveIngredient = (id: string) => {
        setIngredients((prev) => prev.filter((item) => item.id !== id));
    };

    const handleConfirm = () => {
        if (ingredients.length === 0) {
            alert("食材リストが空です。シェフに買ったものを伝えてください！");
            return;
        }
        // 本来はここでDB保存などを行う
        window.location.href = "/recipes/suggest";
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] right-[10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            <header className="w-full p-4 border-b border-white/5 bg-black/20 backdrop-blur-sm z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>戻る</span>
                    </Link>
                    <div className="flex items-center gap-2 font-bold text-white">
                        <ChefHat className="w-6 h-6 text-purple-400" />
                        <span>食材登録</span>
                    </div>
                    <div className="w-16" /> {/* Spacer for centering */}
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 h-[calc(100vh-65px)]">
                {/* Chat Section */}
                <section className="flex-1 h-full min-h-[400px]">
                    <ChatInterface
                        messages={messages}
                        inputValue={inputValue}
                        onInputChange={setInputValue}
                        onSend={handleSend}
                        isSending={isSending}
                    />
                </section>

                {/* Preview Section */}
                <section className="w-full md:w-[350px] lg:w-[400px] h-[300px] md:h-full shrink-0">
                    <IngredientPreview
                        ingredients={ingredients}
                        onRemove={handleRemoveIngredient}
                        onConfirm={handleConfirm}
                    />
                </section>
            </main>
        </div>
    );
}
