import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'

import styles from '../styles/Landing.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { AiOutlineHeart,AiFillHeart  } from 'react-icons/ai';

export default function SocialUser() {
    return(
        <div>hello</div>
    )
}