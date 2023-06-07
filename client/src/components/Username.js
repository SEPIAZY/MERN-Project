import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.jpg';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      console.log(values);
      navigate('/password')
    }
  })

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className={styles.content}>Sign in</h4>
            <span className='py-5 text-lg w-2/3 text-center text-gray-350'>
              Welcome to BE@RBRICK
            </span>
            
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center md:py-5'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="mt-4 md:mt-10 textbox flex flex-col items-center gap-4">
                  <input {...formik.getFieldProps('username')} 
                  className="rounded-xl w-2/3 md:w-3/4 h-12 md:h-14 p-5 shadow-md" 
                  type="text" placeholder='Username' />
                  {/* <input className={styles.textbox} type="text" placeholder='Password' /> */}
                  <button className="md:text-xl rounded-xl border border-black w-2/3 md:w-3/4 h-12 md:h-14 hover:bg-black hover:text-white transition duration-300 ease-in-out" 
                  type='submit'>Let's go</button>
              </div>

              <div className="text-center mt-4 md:mt-4">
                <span className='text-gray-400'>Don't have an account? <Link className='text-black' to="/register">Sign up</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
