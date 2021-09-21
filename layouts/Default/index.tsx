import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Main from '../../components/Main'
import React, { useCallback, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import useRarityStarterPack from '../../hooks/useRarityStarterPack'
import Link from 'next/link'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'

const pixelmix_fonts = ['en']

const Layout = ({ children }: { children?: JSX.Element | undefined }) => {
    const { route } = useRouter()

    const { i18n } = useLingui()

    const { library, account, chainId } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const { locale } = useRouter()

    const { packs_available, balanceOf } = useRarityStarterPack()

    const [showBanner, setShowBanner] = useState(false)

    const [supporter, setSupporter] = useState(false)

    const fetch = useCallback(async () => {
        const packs = await packs_available()
        const balance = await balanceOf(account)
        if (packs && balance === 0 && route !== '/pack') {
            setSupporter(false)
            setShowBanner(true)
        } else {
            setShowBanner(false)
        }
        if (balance > 0) {
            setSupporter(true)
        }
    }, [setShowBanner, packs_available, balanceOf, account, route])

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
                    <div className="p-2 text-center text-xs cursor-pointer hover:animate-bounce">
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
            <Main>{children}</Main>
            <Toaster containerClassName="z-30" />
            <Footer />
        </div>
    )
}

export default Layout
