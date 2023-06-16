import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch()

  const initialForm = {
    name: '',
    email: '',
    password: '',
    confirmPass: ''
  }

  const [formValues, handleInputChange] = useForm(initialForm)

  const handleRegister = (e) => {
    e.preventDefault()
    
    if (formValues.password !== formValues.confirmPass) {
      return Swal.fire('Error', 'Passwords do not match', 'error')
    }

    dispatch( startRegister( formValues.email, formValues.password, formValues.name ) )
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-2">
          <h3>Sign up</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name='name'
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name='email'
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name='password'
                value={formValues.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name='confirmPass'
                value={formValues.confirmPass}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group button mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account" />
            </div>
            <Link to='/login' className='link-2'>
              Login page
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
