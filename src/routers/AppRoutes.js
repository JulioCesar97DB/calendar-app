import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute } from './PrivateRoute'
import { PublicRoutes } from './PublicRoutes'

export const AppRoutes = () => {

  const dispatch = useDispatch()

  const { checking, uid } = useSelector(state => state.auth)

  useEffect(() => {

    dispatch(startChecking())

  }, [dispatch])

  if (checking) {
    return (<h5>Wait...</h5>)
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route path='login' element={
          <PublicRoutes isAutenticated={!!uid}>
            <LoginScreen />
          </PublicRoutes>
        } />
        <Route path='register' element={
          <PublicRoutes isAutenticated={!!uid}>
            <RegisterScreen />
          </PublicRoutes>
        } />
        <Route path='/' element={
          <PrivateRoute isAutenticated={!!uid}>
            <CalendarScreen />
          </PrivateRoute>
        } />

        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>

    </BrowserRouter>
  )
}