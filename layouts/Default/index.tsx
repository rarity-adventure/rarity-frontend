import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Popups from '../../components/Popups'

const Layout = ({ children }: { children?: JSX.Element | undefined }) => {
    return (
        <div className="bg z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0 text-white">
            <Header />
            <Main>{children}</Main>
            <Popups />
            <Footer />
        </div>
    )
}

export default Layout
