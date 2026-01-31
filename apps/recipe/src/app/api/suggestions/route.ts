import { NextResponse } from 'next/server';
import { model } from '@/lib/gemini';
import { prisma } from '@repo/database';

/**
 * レシピを提案するAPI
 * POST /api/suggestions
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { availableIngredients } = body;

        if (!availableIngredients || !Array.isArray(availableIngredients) || availableIngredients.length === 0) {
            return NextResponse.json(
                { error: '有効な食材リスト(availableIngredients)を提供してください' },
                { status: 400 }
            );
        }

        // プロンプトの構築
        const prompt = `
あなたはプロの料理研究家です。
以下の食材リストを使って作ることのできるレシピを3つ提案してください。
出力は必ずRFC8259準拠のJSON形式にし、以下のスキーマに従ってください。

食材リスト: ${availableIngredients.join(', ')}

出力スキーマ:
{
  "recipes": [
    {
      "title": "料理名",
      "description": "料理の簡単な説明",
      "requiredIngredients": ["必要な食材1", "必要な食材2"],
      "steps": ["手順1", "手順2", "手順3"],
      "difficulty": "簡単" | "普通" | "難しい",
      "cookingTime": "目安時間(分)"
    }
  ]
}
`;

        // Gemini API 呼び出し
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log('Gemini Response:', responseText);

        // JSONパース
        let recipes;
        try {
            recipes = JSON.parse(responseText);
        } catch (e) {
            console.error('JSON Parse Error:', e);
            return NextResponse.json(
                { error: 'AIからの応答の解析に失敗しました' },
                { status: 500 }
            );
        }

        // 提案履歴の保存 (オプション)
        try {
            await prisma.recipeSuggestion.create({
                data: {
                    queryIngredients: JSON.stringify(availableIngredients),
                    result: responseText,
                },
            });
        } catch (dbError) {
            console.error('Failed to save suggestion history:', dbError);
            // 履歴保存失敗は致命的エラーにしない
        }

        return NextResponse.json(recipes);
    } catch (error) {
        console.error('Error generating recipe suggestions:', error);
        return NextResponse.json(
            { error: 'レシピ提案の生成に失敗しました' },
            { status: 500 }
        );
    }
}
