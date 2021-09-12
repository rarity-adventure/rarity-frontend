import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Banner from '../../components/Banner'
import Popups from '../../components/Popups'

const Layout = ({
    children,
    banner = undefined,
}: {
    children?: JSX.Element | undefined
    banner?: JSX.Element | undefined
}) => {
    return (
        <div
            className="z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0 text-white"
            style={{ background: 'linear-gradient(180deg, #0F2F5C 0.85%, #0F1F39 7.88%, #0B1526 19.44%)' }}
        >
            {banner && <Banner />}
            <Header />
            <Main>{children}</Main>
            <Popups />
            <Footer />
        </div>
    )
}

export default Layout
