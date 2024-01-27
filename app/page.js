'use client'
// import { useEffect, useState } from "react";
// import { Login } from "./_components/Login/Login";
import { Button } from "./_components/ui/button";
// import { getSession } from "@auth0/nextjs-auth0";

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
export default function Home() {
  const { user, error, isLoading } = useUser();
  // const { user } = await getSession()

  if (isLoading) return <div className="flex items-center justify-center h-full">
    <div className="flex justify-center">
      Loading...</div>
  </div>;

  if (error) return <div className="flex items-center justify-center h-full">
    <div className="flex justify-center">
      {error.message}
    </div>
  </div>;

  return (
    <>
        <div className="flex items-center justify-center h-full">
          <p className="text-6xl">Please, click the upload button to preserve your memories.</p>
        </div>
        <Link href={'/upload'}>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload</button>
        </Link>      
    </>
  );
}
