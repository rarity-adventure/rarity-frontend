import toast from 'react-hot-toast'
import { t } from '@lingui/macro'

export async function sendToast(func: Promise<unknown>, text: string) {
    await toast.promise(func, {
        loading: <b>{text}</b>,
        success: <b>{t`Success`}</b>,
        error: <b>{t`Failed`}</b>,
    })
}
