import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { onRegistration } from '../api/authAPI';

function SignUp() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateValues = (e) => {
    // This dynamically updates the value of the specific input that is passing an event.
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);
      setError('');
      setSuccess(data.message);
      // Reset values
      setValues({
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
      setSuccess('');
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className='sign_card_container'>
      <section className='sign_card signup_card'>
        <input
          onChange={(e) => updateValues(e)}
          type='email'
          className=''
          id='email'
          name='email'
          value={values.email}
          placeholder='Email'
          required
        />

        <input
          onChange={(e) => updateValues(e)}
          type='password'
          value={values.password}
          className=''
          id='password'
          name='password'
          placeholder='Password'
          required
        />

        <input
          onChange={(e) => updateValues(e)}
          type='password'
          value={values.confirmPass}
          className=''
          id='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          required
        />

        <div className='signup_error'>{error}</div>

        <button type='submit' className=''>
          Submit
        </button>

        <div className='sign_link'>
          <p>Signed up?</p>
          <NavLink className='sign_nav_link' to={'/signin'}>
            Login
          </NavLink>
        </div>
      </section>
    </form>
  );
}

export default SignUp;
