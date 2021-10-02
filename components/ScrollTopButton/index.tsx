import React, { useState } from 'react'
import Image from 'next/image'
import { classNames } from '../../functions/classNames'

export default function ScrollTopButton() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        if (scrolled > 400) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    window.addEventListener('scroll', toggleVisible)

    return (
        <button onClick={scrollToTop} className={classNames('scroll-top', visible ? 'inline' : 'hidden')}>
            <Image src="/img/back-top-button.png" width="30" height="30" alt="back-to-top-button" />
        </button>
    )
}
