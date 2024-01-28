import axios from 'axios'

export async function POST(req) {
    const data = await req.json()
    const { photoDescription, photoPastDate, photoFutureDate, userEmail, fileKey } = data
    console.log("ashok backend", photoDescription, photoPastDate, photoFutureDate, userEmail, fileKey)
    try {
        const response = await axios.post(
            'https://ashokcpg.kintone.com/k/v1/record.json',
            {
                'app': 2,
                'record': {
                    'userEmail': { 'value': `${userEmail}` },
                    'photoDescription': { 'value': `${photoDescription}` },
                    'photoMemoryDate': { 'value': `${photoPastDate}` },
                    'photoFutureDate': { 'value': `${photoFutureDate}` },
                    'photoFileKey': { 'value': `${fileKey}` },
                }
            },
            {
                headers: {
                    'X-Cybozu-API-Token': 'lhPWUMb3D63Pjr6BewA5gQyQMWP0bxKgZpWlmXUf',
                    'Content-Type': 'application/json'
                }
            }
        )

        console.log("ashok backend upload response", response)
        
        return Response.json(response.data)
    } catch (error) {
        console.log("ashok", error)
        return Response.json(error)
    }
}