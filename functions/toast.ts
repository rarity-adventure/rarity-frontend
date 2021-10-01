import toast from 'react-hot-toast'
import { t } from '@lingui/macro'

export async function sendToast(func: Promise<unknown>, text: string) {
    await toast.promise(func, {
        loading: text,
        success: t`Success`,
        error: t`Failed`,
    })
}
