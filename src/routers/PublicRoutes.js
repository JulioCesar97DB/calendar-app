import { Navigate } from "react-router-dom"

export const PublicRoutes = ({ 
    isAutenticated,
    children
}) => {

    return !isAutenticated
        ? children
        : <Navigate to={'/'}/>
}