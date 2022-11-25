import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";

const AuthTestPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <h1>Auth test page</h1>

      {session ? (
        <>
          <p>Session: {JSON.stringify(session)}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
        
    )}
    </>
  )
}

export default AuthTestPage