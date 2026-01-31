import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#10b981",
                secondary: "#f97316",
                background: "#f8fafc",
                surface: "#ffffff",
            },
        },
    },
    plugins: [],
};

export default config;
