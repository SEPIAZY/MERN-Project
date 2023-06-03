import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/upload.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper'


import styles from '../styles/Profile.module.css';

export default function Register() {

  const navigate = useNavigate()
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues : {
      email: '',
      username: '',
      password : ''
    },
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });

      registerPromise.then(function(){ navigate('/')});
    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className={styles.content}>Sign up</h4>
            <span className='py-3 text-lg w-3/3 text-center text-gray-350'>
                Let's create your account
            </span>
          </div>

          <form className='py-0' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-2 '>
                  <label htmlFor="profile">
                    <div className='w-36 h-36 rounded-full cursor-pointer shadow-m'>
                        <img src={file || avatar} className="w-full h-full rounded-full" alt="avatar" />
                    </div>
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-4">
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' />
                  <button className={styles.btn} type='submit'>Sign up</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-400'>Already have an account? <Link className='text-black' to="/">Sign in</Link></span>
            
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

