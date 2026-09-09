import fs from 'fs';
import { BUILDINGS, TOP_200 } from './data';

async function getRuWikiName(enName: string) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&lllang=ru&titles=${encodeURIComponent(enName)}&format=json`;
        const resp = await fetch(url).then(res => res.json());
        const pages = resp.query?.pages;
        if (pages) {
            for (const key of Object.keys(pages)) {
                if (pages[key].langlinks && pages[key].langlinks[0] && pages[key].langlinks[0]['*']) {
                    return pages[key].langlinks[0]['*'];
                }
                
                // Maybe the title redirects to something else first? We can also try searching ru.wikipedia directly.
            }
        }
        
        // Let's try searching ru wiki directly
        const ruSearchUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(enName)}&utf8=&format=json&srlimit=1`;
        const ruResp = await fetch(ruSearchUrl).then(res => res.json());
        if (ruResp.query?.search?.length > 0) {
            // Check if snippet or title matches roughly? No, just returning title might be unsafe.
            // Let's just output the first search result for manual review.
            return ruResp.query.search[0].title;
        }
    } catch(e) {}
    return null;
}

async function run() {
    let output = '';
    for (const b of TOP_200) {
        if (/^[A-Za-z0-9 \(\)\.]+$/.test(b.name)) { // Name is mostly English
            const ruName = await getRuWikiName(b.name);
            output += `Original: ${b.name} -> Proposal: ${ruName}\n`;
        }
    }
    fs.writeFileSync('translation_proposals.txt', output);
    console.log('Done mapping.');
}
run();
