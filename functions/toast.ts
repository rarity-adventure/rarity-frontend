import toast from 'react-hot-toast'
import { t } from '@lingui/macro'
import { i18n } from '@lingui/core'

export async function sendToast(func: Promise<unknown>, text: string) {
    await toast.promise(func, {
        loading: text,
        success: i18n._(t`SUCCESS`),
        error: i18n._(t`FAILED`),
    })
}
