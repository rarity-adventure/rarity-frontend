import { Summoner } from '../../state/user/actions'
import { useEffect, useState } from 'react'
import useRarity from '../../hooks/useRarity'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { isAddress } from '../../utils'

interface TransferProps {
    summoner: Summoner
}

export default function Transfer({ summoner }: TransferProps): JSX.Element {
    const { transfer } = useRarity()

    const { account } = useActiveWeb3React()

    const [state, setState] = useState(false)

    const [verify, setVerify] = useState({ valid: false, verified: false, address: '' })

    const [address, setAddress] = useState('')

    async function sendTransfer() {
        if (verify.valid && verify.verified) {
            await transfer(account, verify.address, summoner.id)
        }
    }

    useEffect(() => {
        const valid = isAddress(address)
        if (valid) {
            if (address.toString().toUpperCase() === '0x0000000000000000000000000000000000000000'.toUpperCase()) {
                setVerify({ address: '0x0000000000000000000000000000000000000000', verified: true, valid: false })
            }
            setVerify({ address: valid, verified: true, valid: true })
        } else {
            setVerify({ address: '', verified: true, valid: false })
        }
    }, [address, setVerify])

    return (
        <>
            {state ? (
                <div className="text-white my-3">
                    <h1>Transfer Summoner</h1>
                    <p className="text-xs mt-0.5">Warning!</p>
                    <p className="text-xs mt-0.5">Transfer changes ownership of the summoner!</p>
                    <p className="text-sm mt-0.5 mb-1">New owner</p>
                    <input className="text-custom-background p-2" onChange={(e) => setAddress(e.target.value)} />
                    <div>
                        {verify.valid ? (
                            <button
                                className="m-2 bg-custom-green border-4 border-white p-2 text-xs rounded-lg"
                                onClick={() => sendTransfer()}
                            >
                                Transfer
                            </button>
                        ) : (
                            <button className="opacity-50 cursor-not-allowed m-2 bg-custom-green border-4 border-white p-2 text-xs rounded-lg">
                                Transfer
                            </button>
                        )}
                        <button
                            className="m-2 bg-custom-green border-4 border-white p-2 text-xs rounded-lg"
                            onClick={() => setState(false)}
                        >
                            Cancel
                        </button>
                    </div>
                    {verify.verified && !verify.valid ? (
                        <div className="bg-custom-red p-3 mx-2 rounded-lg text-xs">Address is not valid</div>
                    ) : (
                        <div />
                    )}
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setState(true)}
                        className="m-2 bg-custom-green border-4 border-white p-2 text-xs rounded-lg text-white"
                    >
                        Transfer
                    </button>
                </div>
            )}
        </>
    )
}
