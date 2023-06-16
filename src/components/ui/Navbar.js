import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authLogout } from '../../actions/auth'
import { eventLogout } from '../../actions/events'

export const Navbar = () => {

  const dispatch = useDispatch()

  const { name } = useSelector( state => state.auth)

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch( authLogout() )
    dispatch( eventLogout() )
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
            {name}
        </span>

        <button className='btn btn-outline-danger' onClick={ handleLogout }>
            <i className='fas fa-sign-out-alt'></i>
            <span> Exit</span>
        </button>
    </div>
  )
}
