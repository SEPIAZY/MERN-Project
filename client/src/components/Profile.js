import React, { useState } from 'react'
import avatar from '../assets/upload.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'

export default function Profile() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 
  const formik = useFormik({
    initialValues : {
      username: apiData?.username || '',
      email: apiData?.email || '',
      bio: apiData?.bio || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
      navigate('/collection')
    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '1em'}}>

          <div className="title flex flex-col items-center">
            <h4 className={styles.content}>Profile</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-500'>
              Update your profile
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-4">
                  <input {...formik.getFieldProps('username')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Username' />
                  <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                  <input {...formik.getFieldProps('bio')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Bio' />
                  <button className={styles.btn} type='submit'>Update</button>
               
                  
              </div>

              {/* <div className="text-center py-4">
                <span className='text-gray-400'>come back later? <button onClick={userLogout} className='text-black' to="/">Log out</button></span>
              </div> */}

          </form>

        </div>
      </div>
    </div>
  )
}

