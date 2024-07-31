import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
export default function Frontend() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<h1>No Page, Page Not Found, 404 Error</h1>} />
            </Routes>
        </>
    )
}
