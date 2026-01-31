import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChefHat, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <header className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400">
          <ChefHat className="w-8 h-8 text-purple-400" />
          <span>AI Kitchen</span>
        </div>
      </header>

      <main className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full z-10">
        {/* Character Section */}
        <div className="flex-1 relative flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 bg-linear-to-tr from-purple-500/30 to-blue-500/30 rounded-full blur-[40px] animate-pulse" />
            <Image
              src="/ai-chef.png"
              alt="AI Chef Assistant"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              priority
            />
          </div>
        </div>

        {/* Chat UI Section */}
        <div className="flex-1 flex flex-col gap-8 w-full max-w-lg">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex gap-4 items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center shriink-0">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none text-sm md:text-base leading-relaxed">
                  <p>
                    こんにちは！
                    <span className="inline-block animate-bounce ml-1">👋</span>
                    <br />
                    私はあなたの専属AIシェフです。
                    <br />
                    冷蔵庫の中身を教えてくれれば、最高に美味しいレシピを提案しますよ！
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-4 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all text-white font-medium flex items-center justify-between group shadow-lg shadow-purple-900/20 cursor-pointer">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  今ある食材で提案してもらう
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link href="/inventory/new" className="block">
                <button className="w-full p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-gray-300 hover:text-white font-medium text-left cursor-pointer flex items-center justify-between group">
                  <span>食材を登録する</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 text-center text-sm text-gray-500">
        <p>© 2026 AI Kitchen Assistant. Powered by Gemini.</p>
      </footer>
    </div>
  );
}
