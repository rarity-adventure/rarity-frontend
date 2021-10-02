import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { shortenAddress } from '../../functions/format'
const Footer = () => {
    const { i18n } = useLingui()

    return (
        <footer className="opacity-80 mt-16 pb-20">
            <div className="flex flex-row justify-center text-center" style={{ fontFamily: 'Work Sans' }}>
                <span>
                    {i18n._(t`Created by`)}:{' '}
                    <a target="_blank" rel="noreferrer" href="https://twitter.com/AndreCronjeTech">
                        <b>
                            <span>@AndreCronjeTech</span>
                        </b>
                    </a>{' '}
                    {i18n._(t`and built by`)}:{' '}
                    <a target="_blank" rel="noreferrer" href="https://twitter.com/0xchronos">
                        <b>
                            <span>@0xChronos</span>
                        </b>
                    </a>{' '}
                    <a target="_blank" rel="noreferrer" href="https://twitter.com/mat_nadler">
                        <b>
                            <span>@mat_nadler</span>
                        </b>
                    </a>{' '}
                    {i18n._(t`and`)}{' '}
                    <a target="_blank" rel="noreferrer" href="https://twitter.com/0xlucid">
                        <b>
                            <span>@0xlucid</span>
                        </b>
                    </a>
                </span>
            </div>
            <div className="flex flex-row justify-center" style={{ fontFamily: 'Work Sans' }}>
                <span>
                    {i18n._(t`Donations`)}:{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://ftmscan.com/address/0x5eC86d4d826bF3e12Ee2486B9dF01d7CFa99B6Ca"
                    >
                        <b>
                            <span>{shortenAddress('0x5eC86d4d826bF3e12Ee2486B9dF01d7CFa99B6Ca')}</span>
                        </b>
                    </a>{' '}
                </span>
            </div>
        </footer>
    )
}

export default Footer
