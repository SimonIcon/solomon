import React from 'react'
import styles from "../styles/general.module.scss"


const Dashboard = () => {
    return (
        <div className={`${styles.dashboard} w-full`} name="dashboard">
            <div className='w-full flex flex-col h-full justify-center items-center pt-[100px]'>
                <div className='w-[90%] font-bold text-lg text-black font-Poppins'>
                    <h3 className='w-full px-2 py-2 font-semibold text-2xl tracking-wider text-center'> JNS technology solution Innovates with Quality Products and Effective Services</h3>
                </div>
                <div className='w-[90%]'>
                    <p className='font-light font-Poppins text-sm tracking-wide px-7'>
                        JNS Tech Solutions welcomes you to a realm of excellence, where effective, high-quality products redefine standards. With innovation at our core,
                        elevate businesses to new heights. Experience the future of technology-driven success with us
                    </p>
                </div>

            </div>
        </div >
    )
}

export default Dashboard