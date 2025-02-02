import { Plugin } from 'postcss';

const config: {
    plugins: {
        [key: string]: Plugin | boolean | object;
    };
} = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};

export default config;
