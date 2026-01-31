import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';

/**
 * 食材一覧を取得するAPI
 * GET /api/ingredients
 */
export async function GET() {
    try {
        const ingredients = await prisma.ingredient.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(ingredients);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return NextResponse.json(
            { error: '食材の取得に失敗しました' },
            { status: 500 }
        );
    }
}

/**
 * 食材を新規登録するAPI
 * POST /api/ingredients
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, quantity, unit, category } = body;

        // バリデーション (簡易)
        if (!name || quantity === undefined || !unit) {
            return NextResponse.json(
                { error: '必須項目 (name, quantity, unit) が不足しています' },
                { status: 400 }
            );
        }

        const newIngredient = await prisma.ingredient.create({
            data: {
                name,
                quantity: Number(quantity),
                unit,
                category,
            },
        });

        return NextResponse.json(newIngredient, { status: 201 });
    } catch (error) {
        console.error('Error creating ingredient:', error);
        return NextResponse.json(
            { error: '食材の登録に失敗しました' },
            { status: 500 }
        );
    }
}
