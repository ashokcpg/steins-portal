// fetch the blob images using the filekey
export async function GET(request) {
    const fileKey = request.nextUrl.searchParams.get('fileKey')
    console.log(fileKey)
    try {
        const response = await axios.get('https://ashokcpg.kintone.com/k/v1/file.json', {
            headers: {
                'X-Cybozu-API-Token': 'lhPWUMb3D63Pjr6BewA5gQyQMWP0bxKgZpWlmXUf',
                'Content-Type': 'application/json'
            },
            // data: '{\n    "fileKey": "20240128044756B4DDFBAFF9F049E38EFDCF7F61C87207221"\n  }',
            data: {
                // 'fileKey': '20240128044756B4DDFBAFF9F049E38EFDCF7F61C87207221'
            }
        });
    } catch (error) {
            console.log("error fetching the user posts",error.data);
    }
}

