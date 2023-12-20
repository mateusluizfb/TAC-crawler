# TAC Crawler

## Description

Make sure you have the latest version of Node.js installed.

1. Install dependencies - `npm install`
2. Run the scrapper - `npm run start`
3. Run the parser - `npm run parse`
4. Run a separate file - Example: `npm run only-script src/lib/openai.ts`

This project uses:

- As our crawler/scrapping framework: (Crawlee)[https://github.com/apify/crawlee]
- And for backing the scrapping: (Puppeteer)[https://pptr.dev/]

## Next steps:

- Main.ts
    = Extract the code that returns the correct sites to be scrapped to a separate file, so that it can be easily changed.

- Scrapper
    = Improve the data scrapping. Currently we extract all the texts from the HTML pages, but how do we identify only texts that are relevant to be scrapped?

- Parser
    = Improve data cleaning, given the data extracted from the HTML pages. How do we know which data is relevant to be kept?

- Support OpenAI
    = Test different prompts that extracts the site info.
