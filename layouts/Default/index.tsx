import Footer from '../../components/Footer'
import Header from '../../components/Header'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import useRarityStarterPack from '../../hooks/useRarityStarterPack'
import Link from 'next/link'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useSummoners } from '../../state/summoners/hooks'
import ScrollTopButton from '../../components/ScrollTopButton'
import { Toaster } from 'react-hot-toast'

const pixelmix_fonts = ['en']

const Layout = ({ children }: { children?: JSX.Element | undefined }) => {
    const { route } = useRouter()

    const { i18n } = useLingui()

    const { library, account, chainId } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const { locale } = useRouter()

    const { packs_available, balanceOf } = useRarityStarterPack()

    const summoners = useSummoners()

    const [showBanner, setShowBanner] = useState(false)

    const [supporter, setSupporter] = useState(false)

    const fetch = useCallback(async () => {
        const packs = await packs_available()
        const balance = await balanceOf(account)
        const level3Summoners = summoners.filter((s) => s.base._level >= 3).length
        if (packs && balance === 0 && route !== '/pack' && level3Summoners === 0) {
            setSupporter(false)
            setShowBanner(true)
        } else {
            setShowBanner(false)
        }
        if (balance > 0) {
            setSupporter(true)
        }
    }, [setShowBanner, packs_available, balanceOf, account, route, summoners])

    useEffect(() => {
        if (!windowVisible || !library || !account || !chainId) return
        fetch()
    }, [windowVisible, library, account, chainId, fetch])

    return (
        <div
            style={{ fontFamily: pixelmix_fonts.indexOf(locale) === -1 ? 'Lana Pixel' : '' }}
            className="bg z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0 text-white"
        >
            <Header supporter={supporter} />
            {showBanner ? (
                <div className="w-full">
                    <div className="p-2 text-center text-xs cursor-pointer">
                        <Link href="/pack">
                            <span>
                                {'>>'} {i18n._(t`Check out the Rarity Game Starter Pack`)} {'<<'}
                            </span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div />
            )}
            <main
                className={'flex flex-col items-center justify-start flex-grow w-full h-full'}
                style={{ height: 'max-content' }}
            >
                <Toaster containerClassName="z-50" containerStyle={{ fontFamily: 'Work Sans' }} />
                {children}
                <ScrollTopButton />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
