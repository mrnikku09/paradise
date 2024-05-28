import React, { useContext } from 'react'
import DataContext from '../../Components/Context'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const { existingUserSession } = useContext(DataContext)
    const navigate = useNavigate()
    const logout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if(confirmed)
            {
                const getusersession = localStorage.removeItem('USER_SESSION')
                setTimeout(() => {
                    navigate('/')
                    window.location.reload()
                }, 500);

            }
    }
    return (
        <>
            <div className="col-lg-3">
                <div className="container">
                {/* <div className="row g-3">
                    Home
                </div> */}
                    <div className="row g-3">
                        <div className="col-lg-12 col-4">
                            <a href="/account"><h4>Account</h4></a>
                        </div>
                        <div className="col-lg-12 col-4">
                            <a href="/address"><h4> Address</h4></a>
                        </div>
                        <div className="col-lg-12 col-4">
                            <a href="/order"><h4> Order</h4></a>
                        </div>
                        <div className="col-lg-12 col-4 mt-5">
                            <span className='text-black' style={{ cursor: 'pointer' }} onClick={logout}> <h6>Logout</h6> <hr style={{ width: '70px' }} /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-1">
                <div class="vertical-line"></div>
            </div>

        </>
    )
}

export default User