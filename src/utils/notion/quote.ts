import { Client } from '@notionhq/client'
import { BlockObjectRequest, BlockObjectResponse, ParagraphBlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlockResponse } from '@solana/web3.js';
const notion = new Client({ auth: process.env.NOTION_API_KEY });

function randInt(max: number) {
    return Math.floor(Math.random() * max)
}

// function parseNotionText(textArr: Array<RichTextItemResponse>){
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

function plainNotionTextJson(textArr: Array<RichTextItemResponse>){
    let finalString = textArr.reduce((prev, current) => {
        return prev + current.plain_text
    }, "")

    return {
        text: finalString
    }
}

async function getRandomQuote() {
  const pageId = '5d43fa370eb24a89bbba1da3c192c49d';
  let quotes: (PartialBlockObjectResponse | BlockObjectResponse)[]; 

  let response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
  });
  quotes = response.results
  console.log(quotes.length)

  while(response.has_more)
  {
      response = await notion.blocks.children.list({
          block_id: pageId,
          page_size: 100,
      });
    quotes = [...quotes, ...response.results]
  }
  quotes = quotes.filter((q: any) => q.type == "paragraph")
  console.log(quotes.length)
  
  const block_id = quotes[randInt(quotes.length)]!.id
  const block: any = await notion.blocks.retrieve({
      block_id: block_id
  })

  const quote = plainNotionTextJson(block.paragraph.rich_text)

  return quote
}

export default getRandomQuote

