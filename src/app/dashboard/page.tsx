import { DASHBOARD_CONTENT } from "@/utils/AppConstants";


function Dashboard(){

    return(
        <div className="w-full lg:h-full h-[82vh]  flex items-center justify-center">
            <div className="  text-xs lg:text-2xl p-3 ">
            {DASHBOARD_CONTENT}
            </div>

        </div>
    )

}
export default Dashboard