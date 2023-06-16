import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const initialForm = {
        email: '',
        password: ''
    }

    const [formValues, handleInputChange] = useForm(initialForm)

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(startLogin(formValues.email, formValues.password))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
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
                        <div className="form-group button mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                        <Link to='/register' className='link'>
                            Create new account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}