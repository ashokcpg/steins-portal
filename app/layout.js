import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
import { getSession } from "@auth0/nextjs-auth0";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  const { user } = await getSession() || {};

  return (
    <html lang="en">
      <UserProvider>
        <body className="flex h-full">
          {user ? (
            <>
                <div className="container">
                  <div className="header flex flex-row gap-1">
                    <p>Logged in as </p>
                    <span>{user.name}</span>
                    <img class="w-10 h-10 rounded-full" src={user.picture} alt="Rounded avatar" />
                    <Link href="/api/auth/logout">
                    <button>Logout</button>
                    </Link>
                  </div>
                </div>
            </>
          ) :
            (
              
                <div className="container">
                  <div className="header">
                    <Link href="/api/auth/login">
                    <button>Login</button>
                    </Link>
                  </div>
                </div>
            )}
          <div
            className="w-full h-screen bg-cover bg-center p-20"
          >
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
