import { Client } from '@notionhq/client';
const notion = new Client({ auth: import.meta.env.VITE_NOTION_API_KEY });

export async function GET() {
	const databaseId = '9403fb3798224b89b79db4782f59e978';
	const response = await notion.databases.query({
		database_id: databaseId
	});
    // get all pages that match filter
    const pages = response.results.map((item) => {
        return item.id
    })
    // get properties from each page

	return {
		status: 200,
		headers: {
			'access-control-allow-origin': '*'
		},
		body: {
			data: response.results.map((item) => {
				/* eslint-disable */
				// @ts-ignore
				return item.properties
			})
		}
	};
}
