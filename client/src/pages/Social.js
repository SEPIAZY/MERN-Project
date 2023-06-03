import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
export default function SocialUser() {
    return(
        <div>hello</div>
    )
}