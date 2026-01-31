const BASE_URL_INV = 'http://localhost:3001/api';
const BASE_URL_REC = 'http://localhost:3002/api';

async function verify() {
    console.log('🚀 Starting Verification...');

    // 1. Wait for Server to be ready (Primitive wait)
    // 実際はポーリングすべきですが、簡易的にリトライロジックを入れます
    await waitForServer(BASE_URL_INV + '/ingredients');

    // 2. Test Inventory Service
    console.log('\n📦 Testing Inventory Service...');

    // 2-1. Add Ingredient
    const newIngredient = {
        name: 'ブロッコリー',
        quantity: 1,
        unit: '房',
        category: '野菜'
    };

    console.log('   POST /ingredients:', newIngredient.name);
    const postRes = await fetch(`${BASE_URL_INV}/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIngredient)
    });

    if (!postRes.ok) {
        console.error('❌ Failed to add ingredient:', await postRes.text());
        return;
    }
    const created = await postRes.json();
    console.log('   ✅ Created:', created.id);

    // 2-2. Get Ingredients
    console.log('   GET /ingredients');
    const getRes = await fetch(`${BASE_URL_INV}/ingredients`);
    const ingredients = await getRes.json();
    console.log(`   ✅ Fetched ${ingredients.length} ingredients.`);
    console.log('   Items:', ingredients.map(i => i.name).join(', '));

    // 3. Test Recipe Service
    console.log('\n🍳 Testing Recipe Service (Gemini)...');
    const availableIngredients = ingredients.map(i => i.name);

    if (availableIngredients.length === 0) {
        console.warn('⚠️ No ingredients available for recipe suggestion.');
    } else {
        console.log('   POST /suggestions with:', availableIngredients);
        // タイムアウトを考慮して長めに待つ必要はないが、fetchはデフォルトでタイムアウト早めではない
        const recRes = await fetch(`${BASE_URL_REC}/suggestions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ availableIngredients })
        });

        if (!recRes.ok) {
            console.error('❌ Failed to get suggestion:', await recRes.text());
        } else {
            const suggestions = await recRes.json();
            console.log('   ✅ Recipe Suggestions Received:');
            if (suggestions.recipes) {
                suggestions.recipes.forEach((r, i) => {
                    console.log(`     ${i + 1}. ${r.title} (${r.cookingTime})`);
                });
            } else {
                console.log('     (Unexpected format)', suggestions);
            }
        }
    }

    console.log('\n✨ Verification Finished.');
}

async function waitForServer(url) {
    console.log('⏳ Waiting for server to be ready...');
    for (let i = 0; i < 30; i++) {
        try {
            await fetch(url);
            console.log('✅ Server is ready!');
            return;
        } catch (e) {
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    throw new Error('Server timeout');
}

verify().catch(console.error);
