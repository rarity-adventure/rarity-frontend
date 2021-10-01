import toast from 'react-hot-toast'

export async function sendToast(func: Promise<unknown>, text: string, success?: string, failed?: string) {
    await toast.promise(func, {
        loading: text,
        success: success,
        error: failed,
    })
}
