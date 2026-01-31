export type Ingredient = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    category: string;
};

export type RecipeSuggestion = {
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
};

const INVENTORY_API = 'http://localhost:3001/api';
const RECIPE_API = 'http://localhost:3002/api';

export const api = {
    ingredients: {
        list: async (): Promise<Ingredient[]> => {
            const res = await fetch(`${INVENTORY_API}/ingredients`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch ingredients');
            return res.json();
        },
        create: async (data: Omit<Ingredient, 'id'>): Promise<Ingredient> => {
            const res = await fetch(`${INVENTORY_API}/ingredients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create ingredient');
            return res.json();
        },
    },
    recipes: {
        suggest: async (ingredients: string[]): Promise<RecipeSuggestion> => {
            const res = await fetch(`${RECIPE_API}/suggestions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ availableIngredients: ingredients }),
            });
            if (!res.ok) throw new Error('Failed to get suggestions');
            return res.json();
        },
    },
};
