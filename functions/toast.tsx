import { t } from '@lingui/macro'
import React from 'react'
import toast from 'react-hot-toast'
import { useLingui } from '@lingui/react'

export async function sendToast(text: string) {
    const { i18n } = useLingui()
    await toast.promise(adventure(summoner.id), {
        loading: <b>{i18n._(text)}</b>,
        success: <b>{i18n._(t`Success`)}</b>,
        error: <b>{i18n._(t`Failed`)}</b>,
    })
}
