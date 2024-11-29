import React from 'react'
import RegContent from '../../Home/RegContent'
import Register from './Register'

const RegisterPage = () => {
  return (
    <main className='main'>
    <div className='homepage__divs'>
        <RegContent/>
        <section>
            <Register/>
        </section>
    </div>
</main>
  )
}

export default RegisterPage
