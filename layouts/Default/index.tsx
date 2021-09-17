import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Main from '../../components/Main'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children }: { children?: JSX.Element | undefined }) => {
    return (
        <div className="bg z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0 text-white">
            <Header />
            <Main>{children}</Main>
            <Toaster containerClassName="z-30" />
            <Footer />
        </div>
    )
}

export default Layout
