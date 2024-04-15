import React from 'react'
import { useAuth } from '../../contexts/authContext'
import List from '../product/productList'

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <>
        <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
        <List/>
        </>
    )
}

export default Home