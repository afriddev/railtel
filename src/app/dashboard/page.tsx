import { DASHBOARD_CONTENT } from "@/utils/AppConstants";


function Dashboard(){

    return(
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-2xl">
            {DASHBOARD_CONTENT}
            </div>

        </div>
    )

}
export default Dashboard