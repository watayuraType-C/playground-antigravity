import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';

/**
 * 食材を更新するAPI
 * PUT /api/ingredients/[id]
 */
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = (await params).id;
        const body = await request.json();
        const { name, quantity, unit, category } = body;

        // 更新実行
        const updatedIngredient = await prisma.ingredient.update({
            where: { id },
            data: {
                name,
                quantity: Number(quantity),
                unit,
                category,
            },
        });

        return NextResponse.json(updatedIngredient);
    } catch (error) {
        console.error('Error updating ingredient:', error);
        // レコードが見つからない場合のエラーコード処理などは省略
        return NextResponse.json(
            { error: '食材の更新に失敗しました' },
            { status: 500 }
        );
    }
}

/**
 * 食材を削除するAPI
 * DELETE /api/ingredients/[id]
 */
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = (await params).id;

        await prisma.ingredient.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        return NextResponse.json(
            { error: '食材の削除に失敗しました' },
            { status: 500 }
        );
    }
}
