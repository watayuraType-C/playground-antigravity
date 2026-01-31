import { ChefHat } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-white border-b border-slate-200">
            <div className="container mx-auto px-4 h-16 flex items-center">
                <div className="flex items-center gap-2 text-primary">
                    <ChefHat className="w-8 h-8" />
                    <h1 className="text-xl font-bold tracking-tight">AI Kitchen Staff</h1>
                </div>
            </div>
        </header>
    );
}
