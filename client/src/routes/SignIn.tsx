import React, { useState, useContext } from 'react';
import { onLogin } from '../api/authAPI';
import { NavLink } from 'react-router-dom';
import { CryptoContext } from '../context/CryptoContext';

function SignIn() {
  const { authenticateUser } = useContext(CryptoContext);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    // This dynamically updates the value of the specific input that is passing an event.
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      authenticateUser();
      localStorage.setItem('localAuth', 'true');
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className='sign_card_container'>
      <section className='sign_card'>
        <input
          onChange={(e) => onChange(e)}
          type='email'
          className=''
          id='email'
          name='email'
          value={values.email}
          placeholder='Email'
          required
        />

        <input
          onChange={(e) => onChange(e)}
          type='password'
          value={values.password}
          className=''
          id='password'
          name='password'
          placeholder='Password'
          required
        />

        <div className='signin_error'>{error}</div>

        <button type='submit' className=''>
          Submit
        </button>

        <div className='sign_link'>
          <p>No Account?</p>
          <NavLink className='sign_nav_link' to={'/signup'}>
            Register
          </NavLink>
        </div>
      </section>
    </form>
  );
}

export default SignIn;
