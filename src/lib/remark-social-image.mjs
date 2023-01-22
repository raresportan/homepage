import * as fs from "fs";
import puppeteer from "puppeteer";
import { SITE_URL } from '../config';

export function remarkSocialImage() {
    return async function (tree, { data }) {        
        const titleSlug = data.astro.frontmatter.title?.split('')
            .filter(c => !/^[,?!()<>]/gi.test(c))
            .join('')
            .split(' ')
            .map(s => s.toLowerCase())
            .join('-')

        const filePath = `public/twitter-cards/${titleSlug}.png`;  
        data.astro.frontmatter.twitterImage = `${SITE_URL}/twitter-cards/${titleSlug}.png`; 
        
        if(!fs.existsSync(filePath)) {
            console.log('Create twitter card:', filePath);

            const browser = await puppeteer.launch();
            // Get the html
            const html = fs
                .readFileSync("src/og-image/og-image.html", "utf-8")
                .toString()
                .replace("@title", data.astro.frontmatter.title);

            const page = await browser.newPage();
            await page.setContent(html);
            await page.waitForNetworkIdle();
            await page.setViewport({
                width: 1200,
                height: 669,
            });

            await page.screenshot({
                path: filePath,
                encoding: "binary",
            });            
            await browser.close();
        }
    };
}