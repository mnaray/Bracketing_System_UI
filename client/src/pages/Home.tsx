import React from 'react'
import { auth } from '../config/firebaseConfig';


function Home() {
    function handleClick() {
        auth.signOut();
    }
    return (

        <div>
            <h1>Welcome, {auth.currentUser?.displayName}</h1>
            <button onClick={handleClick}>Sign out</button>
        </div>

    )
}

export default Home