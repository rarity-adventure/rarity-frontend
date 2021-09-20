import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Main from '../../components/Main'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

const pixelmix_fonts = ["en", "zh_CN", "zh_TW"]

const Layout = ({ children }: { children?: JSX.Element | undefined }) => {
    const { locale } = useRouter()



    return (
        <div style={{fontFamily: pixelmix_fonts.indexOf(locale) !== -1 ? "pixelmix" : "Noto Mono" }} className="bg z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0 text-white">
            <Header />
            <Main>{children}</Main>
            <Toaster containerClassName="z-30" />
            <Footer />
        </div>
    )
}

export default Layout
