"use client";
// import { useEffect, useState } from "react";
// import { Login } from "./_components/Login/Login";
import { Button } from "./_components/ui/button";
// import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import axios from 'axios'
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { staticPhotos } from "@/lib/imageList";
import PolaroidImage, { PolaroidImageAuth } from "./_components/PolaroidImage";
import { useState, useEffect } from "react";

const getRandomPhotoURL = () => {
  const randomIndex = Math.floor(Math.random() * staticPhotos.length);
  return staticPhotos[randomIndex].file;
};

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex justify-center">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex justify-center">{error.message}</div>
      </div>
    );

  if (user) {
    const [userData, setUserData] = useState([])
    useEffect(() =>{
      fetchUserData()
    },[])
    
    const fetchUserData = async () => {
      const response = await axios.get(`http://localhost:3000/api/userposts?email=${user.email}`)
      console.log("ash",response.data)
      setUserData(response.data)
    }

    return (
      <>
        <div className="flex items-center text-lg font-bold justify-start">
          Preserve your precious moments!
          </div>
        <Link href={"/upload"}>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Upload
          </button>
        </Link>
        <div className="flex flex-wrap gap-4 mt-4">

        {
          userData && userData.map((photo) => {
            return <PolaroidImageAuth key={photo.fileKey.value} photoDescription={photo.photoDescription.value} publishedDate={photo.photoMemoryDate.value} file={getRandomPhotoURL()} />
          })
        }
        </div>

      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center h-full">
          {/* <Link href={"/api/auth/login"}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Login
            </button>
          </Link> */}
          <div className="mt-80 grid grid-cols-4 gap-4">
              {/* <Image
                className="tryImage"
                src=""
                width={500}
                height={500}
                alt="Picture of the vercel logo"
              /> */}
              {
                
                staticPhotos.slice(0,4).map((photo) => {
                  return <PolaroidImage key={photo.id} photoDescription={photo.photoDescription} publishedDate={photo.publishedDate} file={photo.file} />
                })
              }
          </div>
        </div>
      </>
    );
  }
}
