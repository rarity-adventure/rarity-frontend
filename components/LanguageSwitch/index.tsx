import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'
import { classNames } from '../../functions/classNames'

const LANG_TO_COUNTRY = {
    en: 'English',
    zh_CN: '简体中文',
    zh_TW: '繁體中文',
    tr: 'Türkçe',
    el: 'Ελληνικά',
}

export default function LangSwitcher() {
    const { locale, locales, asPath } = useRouter()

    return (
        <Menu as="div" className="relative inline-block text-right ml-3">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="inline-flex justify-center w-full p-2 text-sm font-bold border-2 rounded-lg shadow-sm text-primary border-white">
                            <h2>{LANG_TO_COUNTRY[locale]}</h2>
                        </Menu.Button>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-36 mt-2 rounded shadow-lg bg-background-contrast">
                            <div className="p-1">
                                {locales.map((locale) => {
                                    return (
                                        <Menu.Item key={locale}>
                                            {({ active }) => (
                                                <Link href={asPath} locale={locale}>
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-background-start text-high-emphesis'
                                                                : 'text-primary',
                                                            'group flex items-center p-2 text-sm rounded font-bold'
                                                        )}
                                                        onClick={() => cookieCutter.set('NEXT_LOCALE', locale)}
                                                    >
                                                        <h2 className="ml-2">{LANG_TO_COUNTRY[locale]}</h2>
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    )
                                })}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}
