import * as xml from 'xsd-ts'

import * as fs from 'fs'

import { serialize } from '@ungap/structured-clone';

async function main() {
    console.log('Start')
    if (!fs.existsSync('src/data')) {
        await fs.promises.mkdir('src/data');
    }
    const x = await xml.parseSchemas('https://nota-game.github.io/schema/vNext/nota.xsd');
    const types = await xml.generateTypes(x);
    const txt = xml.toTsTypes(types);
    await fs.promises.writeFile('src/data/nota.g.ts', txt);
    const serialized = serialize(x,{ lossy:true});
    await fs.promises.writeFile('src/data/nota-structure.g.json', JSON.stringify(serialized));
    console.log('finish')

}

main();