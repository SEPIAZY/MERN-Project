import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import LandingPage from './pages/Landingpage';
import Social from './pages/Social';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';
import Collection from './pages/Collection';
import Friend from './pages/Friend';
import UserRequest from './pages/userrequest';
import RequestFromUser from './components/RequestFromUser';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path : '/landingpage',
        element : <LandingPage></LandingPage>
    },
    {
        path : '/social',
        element : <Social></Social>
    },
    {
        path : '/additem',
        element : <AddItem></AddItem>
    },
    {
        path : '/updateitem',
        element : <UpdateItem></UpdateItem>
    },
    {
        path : '/collection',
        element : <Collection></Collection>
    },
    {
        path : '/friend',
        element : <Friend></Friend>
    },
    {
        path : '/userrequest',
        element : <UserRequest></UserRequest>
    },
    {
        path : '/requestfromuser',
        element : <RequestFromUser></RequestFromUser>
    }
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
