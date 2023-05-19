import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// function randInt(max: number) {
//     return Math.floor(Math.random() * max)
// }

// function parseNotionText(textArr){
//     let finalString = textArr.reduce((prev, current) => {
//         let curString = current.plain_text
//         if (current.annotations.bold){
//             curString = "<b>" + curString + "</b>"
//         }
//         if (current.annotations.italicized){
//             curString = "<i>" + curString + "</i>"
//         }
//         if (current.annotations.underlined){
//             curString = "<u>" + curString + "</u>"
//         }
//         return prev + curString
//     }, "")

//     return finalString
// }

// function plainNotionTextJson(textArr){
//     let finalString = textArr.reduce((prev, current) => {
//         return prev + current.plain_text
//     }, "")

//     return {
//         text: finalString
//     }
// }

async function getRandomQuote() {
    const pageId = '5d43fa370eb24a89bbba1da3c192c49d';
    let response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
    });
    while(response.has_more)
    {
        response = await notion.blocks.children.list({
            block_id: pageId,
            page_size: 100,
        });
    }

    return response
}

export default getRandomQuote

