import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const dark = require('./themes/dark.json');
export const light = require('./themes/light.json');
export { default as rehypeSupalight } from './rehype.js';
