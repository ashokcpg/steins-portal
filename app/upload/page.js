'use client'
import React, { useState, useEffect } from 'react'
import ImageUpload from '../_components/ImageUpload/ImageUpload'
import axios from 'axios'
import PolariodImage from '../_components/PolaroidImage'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';


const Upload = () => {
  const { user } = useUser()

  const [file, setFile] = useState()
  const [fileObject, setFileObject] = useState()
  const [photoInfo, setPhotoInfo] = useState({})


  useEffect(() => {
    if (fileObject) {
      const formData = new FormData();
      formData.append('file', fileObject);
      console.log("sujal 1", formData)
      fetchData(fileObject);

    }
  }, [fileObject])

  const fetchData = async (formData) => {
    console.log("sujal", formData)
    // try {
    //   const form = new FormData();
    //   form.append('file', fs.readFileSync('FILEPATH'), 'FILEPATH');

    //   const response = await axios.post(
    //     'https://ashokcpg.kintone.com/k/v1/file.json',
    //     form,
    //     {
    //       headers: {
    //         ...form.getHeaders(),
    //         'X-Cybozu-API-Token': 'lhPWUMb3D63Pjr6BewA5gQyQMWP0bxKgZpWlmXUf'
    //       }
    //     }
    //   );

    //   console.log("sujal 2",response);
    // } catch (error) {
    //   // Handle errors
    //   console.error("sujal 3",error);
    // }
  };


  const handleFileChange = (e) => {
    setFileObject(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    setPhotoInfo({ ...photoInfo, [e.target.name]: e.target.value })
  }

  const uploadData = async () => {
// random hex filekey 
    const fileKey = Math.random().toString(16).slice(2)
    // userEmail, photoDescription, photoPastDate, photoFutureDate

    const { photoDescription, publishedDate: photoPastDate, futureDate: photoFutureDate } = photoInfo
    const { email:userEmail } = user

    console.log("ashok",userEmail, photoDescription, photoPastDate, photoFutureDate, fileKey)
try{

  const response = await axios.post(
    'https://ashokcpg.kintone.com/k/v1/record.json',
    {
      'app': 2,
      'record': {
        'userEmail': {'value':`${userEmail}`},
        'photoDescription': {'value':`${photoDescription}`},
        'photoMemoryDate': {'value':`${photoPastDate}`},
        'photoFutureDate': {'value':`${photoFutureDate}`},
        'photoFileKey': {'value':`${fileKey}`},
      }
    },
    {
      headers: {
        'X-Cybozu-API-Token': 'lhPWUMb3D63Pjr6BewA5gQyQMWP0bxKgZpWlmXUf',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?1',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://backfromthefuture.tech/',
        'sec-ch-ua-platform': '"Android"'
      }
    }
  );
  console.log("upload response ash", response)

      // redirect to home
      window.location.href = '/'
    }catch(error){
      // clear form data
      // setFileObject(null)
      // setFile(null)
      // setPhotoInfo({})
      console.log("upload data error",error)

    }
  }
  return (<>
    <div className='mb-5'>

      <Link href={"/"}>
        <button className='bg-red-500 text-white px-3 py-1 rounded-md'>Go Home!</button>
      </Link>
    </div>
    {
      !fileObject && <div className='flex flex-column gap-5 flex-col'>
        <ImageUpload onChange={handleFileChange} />
      </div>
    }
    <div class="item">
      {fileObject && <div className='flex flex-column gap-5 flex-col'>
        {/* Remove button */}
        <div class="mb-6 w-full flex flex-col gap">
          <div className="nameWrapper">
            <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter short description:</label>
            <input placeholder='Your Description' onChange={handleInputChange} name='photoDescription' type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <div className="publishedDateWrapper">
              <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter published date:</label>
              <input onChange={handleInputChange} name='publishedDate' type="date" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="futureDate">
              <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter future date:</label>
              <input onChange={handleInputChange} name='futureDate' type="date" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
        </div>
        <div className='flex flex-row w-full justify-between'>
          <button onClick={uploadData} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Upload
          </button>
          <button className='bg-red-500 text-white px-3 py-1 rounded-md' onClick={() => {
            setFileObject(null)
            setFile(null)
            setPhotoInfo({})
          }}>Remove</button>
        </div>
        <PolariodImage photoDescription={photoInfo.photoDescription} publishedDate={photoInfo.publishedDate} file={file} />
      </div>
      }
    </div >
  </>
  )
}

export default Upload