import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../components/header/hooks/useAuth"


export default function ProtectedRoute(){
const  {user} = useAuth()

const isAuth  = !!user
    if (!isAuth) {
        return <Navigate to="/" replace />
    }

    return <Outlet/>
}