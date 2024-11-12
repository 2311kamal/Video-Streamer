import React from 'react'
import Navbar from './navbar'
import Navbar from './sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Sidebar/>
    </>
  )
}

export default Layout