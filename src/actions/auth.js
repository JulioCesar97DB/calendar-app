import { types } from "../types/types";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import Swal from "sweetalert2";


export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {

        const resp = await fetchSinToken( 'auth', {email, password}, 'POST' )
        const body = await resp.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        }else{
            console.log(body);
            Swal.fire('Error', 'Wrong user or password', 'error')
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async (dispatch) => {
        const resp = await fetchSinToken( 'auth/register', { email, password, name }, 'POST' )
        const body = await resp.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch( login ({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            // Swal.fire('Error', body.msg, 'error')

            if (body.errors.name) {
                Swal.fire('Error', body.errors.name.msg , 'error')
            }
            if (body.errors.email) {
                Swal.fire('Error', body.errors.email.msg , 'error')
            }  
            if (body.errors.password) {
                Swal.fire('Error', body.errors.password.msg , 'error')
            }
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken( 'auth/renew' )
        const body = await resp.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch( login ({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() )
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

export const authLogout = () => {
    return ( dispatch ) => {
        localStorage.clear()

        dispatch( logOut() )
    }
}

const logOut = () => ({
    type: types.authLogout
})