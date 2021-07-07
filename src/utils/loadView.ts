import { readFileSync } from 'fs';
import { join } from 'path';

export async function loadView(name: string, context: any) {
    const filePath = join(__dirname, '../', `views/${name}`);
    const template = readFileSync(filePath, 'utf-8');
    return template.replace(/{{(.+?)}}/g, (match: any) => context[match.slice(2, -2)]);
}
