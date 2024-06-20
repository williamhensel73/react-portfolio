import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import './index.scss'

const Layout = () => {
    return (
        <div className='App'>
        <Sidebar />
        <div className='page'>
            <span className='tags top-tags'>&lt;Hello&gt;</span>

            <Outlet></Outlet>

            <span className='tags bottom-tags'>
            &lt; :) &gt;
            <br/>
            <span className='bottom-tag-goodbye'>&lt;Goodbye&gt;</span>
            </span>
        </div>
        </div>
    )
}

export default  Layout
