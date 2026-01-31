"use client";

import { ChefHat, Send, Sparkles, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

type ChatInterfaceProps = {
    messages: Message[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
    isSending: boolean;
};

export const ChatInterface = ({
    messages,
    inputValue,
    onInputChange,
    onSend,
    isSending,
}: ChatInterfaceProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50">
                    <Image src="/ai-chef.png" alt="AI Chef" fill className="object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                        AI Chef
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </h3>
                    <p className="text-xs text-gray-400">Online • Ready to cook</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shriink-0 ${message.role === "assistant"
                                    ? "bg-linear-to-br from-purple-500 to-blue-600"
                                    : "bg-gray-700"
                                }`}
                        >
                            {message.role === "assistant" ? (
                                <ChefHat className="w-5 h-5 text-white" />
                            ) : (
                                <User className="w-5 h-5 text-gray-300" />
                            )}
                        </div>
                        <div
                            className={`max-w-[80%] p-4 rounded-2xl text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 ${message.role === "assistant"
                                    ? "bg-white/10 rounded-tl-none text-gray-100"
                                    : "bg-purple-600 text-white rounded-tr-none"
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSend();
                    }}
                    className="relative"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder="例: 豚肉300gと玉ねぎ2個を買ったよ"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isSending}
                        className="absolute right-2 top-2 p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition-colors cursor-pointer"
                    >
                        {isSending ? (
                            <Sparkles className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
