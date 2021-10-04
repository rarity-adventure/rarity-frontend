import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" dir="ltr" style={{ overflow: 'auto !important' }}>
                <Head>
                    <link rel="manifest" href="/manifest.json" />

                    <link rel="icon" type="image/png" sizes="196x196" href="favicon-196.png" />

                    <meta name="msapplication-square70x70logo" content="mstile-icon-128.png" />
                    <meta name="msapplication-square150x150logo" content="mstile-icon-270.png" />
                    <meta name="msapplication-square310x310logo" content="mstile-icon-558.png" />
                    <meta name="msapplication-wide310x150logo" content="mstile-icon-558-270.png" />

                    <link rel="apple-touch-icon" href="apple-icon-180.png" />

                    <meta name="apple-mobile-web-app-capable" content="yes" />

                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2048-2732.png"
                        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2732-2048.png"
                        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1668-2388.png"
                        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2388-1668.png"
                        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1536-2048.png"
                        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2048-1536.png"
                        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1668-2224.png"
                        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2224-1668.png"
                        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1620-2160.png"
                        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2160-1620.png"
                        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1284-2778.png"
                        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2778-1284.png"
                        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1170-2532.png"
                        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2532-1170.png"
                        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1125-2436.png"
                        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2436-1125.png"
                        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1242-2688.png"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2688-1242.png"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-828-1792.png"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1792-828.png"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1242-2208.png"
                        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-2208-1242.png"
                        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-750-1334.png"
                        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1334-750.png"
                        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-640-1136.png"
                        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="apple-splash-1136-640.png"
                        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                </Head>
                <body className="bg-background-end">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
