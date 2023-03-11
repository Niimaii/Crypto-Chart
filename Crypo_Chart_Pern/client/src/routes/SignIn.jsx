import React, { useState, useContext } from 'react';
import { onLogin } from '../api/authAPI';
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
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className='mt-3'>
      <h1>Register</h1>

      <div className='mb-3'>
        <label htmlFor='email' className=''>
          Email address
        </label>
        <input
          onChange={(e) => onChange(e)}
          type='email'
          className=''
          id='email'
          name='email'
          value={values.email}
          placeholder='test@gmail.com'
          required
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='password' className=''>
          Password
        </label>
        <input
          onChange={(e) => onChange(e)}
          type='password'
          value={values.password}
          className=''
          id='password'
          name='password'
          placeholder='password'
          required
        />
      </div>

      <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

      <button type='submit' className=''>
        Submit
      </button>
    </form>
  );
}

export default SignIn;
