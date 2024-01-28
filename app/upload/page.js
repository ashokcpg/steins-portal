'use client'
import React, { useState , useEffect} from 'react'
import ImageUpload from '../_components/ImageUpload/ImageUpload'
import axios from 'axios'

const Upload = () => {

  const [fileKey, setFileKey] = useState('')



  const [file, setFile] = useState()
  const [fileObject, setFileObject] = useState()
  const [photoInfo, setPhotoInfo] = useState({})


  useEffect(() => {
    if (fileObject) {
      const formData = new FormData();
      formData.append('file', fileObject);
      console.log("sujal 1",formData)
      fetchData(fileObject);

    }}, [fileObject])

  const fetchData = async (formData) => {
    console.log("sujal",formData)
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

  return (<>
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
        <div className='flex justify-end'>
          <button className='bg-red-500 text-white px-3 py-1 rounded-md' onClick={() => {
            setFileObject(null)
            setFile(null)
            setPhotoInfo({})
          }}>Remove</button>
        </div>
        <div class="polaroid w-full">
          <div className="single-day-regular caption">{photoInfo?.photoDescription || 'Your Description'}</div>
          <p className='single-day-regular-italic'>{photoInfo?.publishedDate || '2004-12-13'}</p>
          <img src={file} alt="asd" />
        </div>
      </div>
      }
    </div >
  </>
  )
}

export default Upload