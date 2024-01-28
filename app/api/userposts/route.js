// https://{subdomain}.kintone.com/k/v1/records.json

import { getSession } from "@auth0/nextjs-auth0";
import axios from 'axios'


// test api
export async function GET(request) {
    const userEmail = request.nextUrl.searchParams.get('email')
    console.log(userEmail)
    try {
        const response = await axios.get('https://ashokcpg.kintone.com/k/v1/records.json', {
            headers: {
                'X-Cybozu-API-Token': 'lhPWUMb3D63Pjr6BewA5gQyQMWP0bxKgZpWlmXUf',
                'Content-Type': 'application/json'
            },
            // data: '{"app": 2, "query": "order by $id asc limit 100 offset 0"}',
            data: {
                'app': 2,
                'query': 'order by $id asc limit 100 offset 0',
                'fields': [
                    'photoDescription',
                    'photoMemoryDate',
                    'photoFutureDate',
                    'fileKey',
                    'userEmail'
                ]
            }
        });
        const filteredRecords = response.data.records.filter(record => record.userEmail.value === userEmail)
        return Response.json(filteredRecords)
    } catch (error) {
            console.log("error fetching the user posts",error.data);
    }
}