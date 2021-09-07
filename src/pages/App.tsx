import { Suspense, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppBar } from '../components'
import Web3ReactManager from '../components/Web3ReactManager'
import Routes from '../routes'

function App(): JSX.Element {
    const bodyRef = useRef<any>(null)

    const { pathname } = useLocation()

    const [wrapperClassList, setWrapperClassList] = useState(
        'flex flex-col flex-1 items-center justify-start w-screen h-full overflow-y-auto overflow-x-hidden z-0 pt-4 sm:pt-8 md:pt-10 pb-20'
    )

    useEffect(() => {
        setWrapperClassList(
            'flex flex-col flex-1 items-center justify-start w-screen h-full overflow-y-auto overflow-x-hidden z-0 pt-4 sm:pt-8 md:pt-10 pb-20'
        )
    }, [pathname])

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTo(0, 0)
        }
    }, [pathname])

    return (
        <Suspense fallback={null}>
            <div className="flex flex-col h-screen items-start overflow-x-hidden bg-custom-background">
                <AppBar />
                <div ref={bodyRef} className={wrapperClassList}>
                    <Web3ReactManager>
                        <Routes />
                    </Web3ReactManager>
                </div>
            </div>
        </Suspense>
    )
}

export default App
