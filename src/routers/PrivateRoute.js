import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ 
    isAutenticated,
    children
}) => {

    return isAutenticated
        ? children
        : <Navigate to={'login'}/>
}