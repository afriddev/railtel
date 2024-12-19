"use client"

import AppNavBar from "./apputils/AppNavbar"
import AppSidebar from "./apputils/AppSidebar"
import Outlet from "./apputils/Outlet"


function Home(){
    return <div className="w-full h-full max-h-[100vh] flex flex-col gap-2 pt-4">
        <AppNavBar/>
        <div className="flex gap-3 h-[91vh] pr-2 ">
        <AppSidebar />
        <Outlet/>
        
        </div>

    </div>
}
export default Home