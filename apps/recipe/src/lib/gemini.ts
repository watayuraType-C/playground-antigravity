import { GoogleGenerativeAI } from '@google/generative-ai';

// APIキーの確認
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. AI features will not work.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

// モデルの初期化 (JSONモードを使用するため、最新モデル推奨)
// flashモデルは高速で安価、proは高精度
export const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        responseMimeType: 'application/json',
    },
});
