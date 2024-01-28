import axios from 'axios'
import { Resend } from 'resend'

export async function POST(req) {
    const data = await req.json()
    const { photoDescription, photoPastDate, photoFutureDate, userEmail, fileKey } = data
    console.log("ashok backend", photoDescription, photoPastDate, photoFutureDate, userEmail, fileKey)
    try {

        // random hex key generator
        const key = Math.random().toString(16).substr(2, 8)

        const resend = new Resend('re_bddESeFK_HygnXCLWKypgMd5ZrWT4Jpq2');
        
        console.log("ashok user email",userEmail)

        const emailResponse = await resend.emails.send({
            from: 'no-reply@backfromthefuture.tech',
            to: [`${userEmail}`], 
            subject: 'THANK YOU FOR SAVING YOUR MEMORIES',
            html: `<body class="bg-gray-100 p-4">

    <div class="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Secret Key Notification</h2>

        <p class="mb-4">Dear ${userEmail},</p>

        <p class="mb-4">Thank you for keeping your memories on our website. Please use the secret key to unlock the memory after the set future date:</p>

        <div class="bg-gray-200 p-4 rounded-md">
            <p class="text-lg font-semibold text-center text-blue-600">{{ ${key} }}</p>
        </div>

        <p class="mt-4">Keep this key safe and secure, as it will be required for future access.</p>

        <p class="mt-4">If you have any questions or concerns, feel free to contact our support team.</p>

        <p class="mt-8 text-gray-500">Best regards,<br>Steins Team</p>
    </div>

</body>`
        });

        console.log("ashok backend email response", emailResponse)
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