'use client'
import { useEffect, useState } from "react";
import { Login } from "./_components/Login/Login";

export default function Home() {
  // const [isLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem('isLoggedIn'))
  return (
      <Login  />
      // : <h1>Please log in</h1>
  );
}
