import * as xml from 'xsd-ts'

import * as fs from 'fs'
import fetch from 'node-fetch';



import { serialize } from '@ungap/structured-clone';

async function main() {
    console.log('Start')
    if (!fs.existsSync('src/data')) {
        await fs.promises.mkdir('src/data');
    }
    console.log('download xml');
    const data = await (await fetch('https://nota-game.github.io/Content/vNext/data/nota.xml')).text();
    console.log('download schema');
    const x = await xml.parseSchemas('https://nota-game.github.io/schema/vNext/nota.xsd');
    const types = await xml.generateTypes(x,(name)=>`${name.local}_${name.namespace.replace(/https:\/\/nota-game.github.io\/schema\/vNext\//g,'').replace(/\//g,'_').replace(/\.xsd/g,'')}`);
    const txt = xml.toTsTypes(types);
    await fs.promises.writeFile('src/data/nota.g.ts', txt);
    await fs.promises.writeFile('src/data/nota.g.xml', data);
    const serialized = serialize(x,{ lossy:true});
    await fs.promises.writeFile('src/data/nota-structure.g.json', JSON.stringify(serialized));
    console.log('finish')

}

main();