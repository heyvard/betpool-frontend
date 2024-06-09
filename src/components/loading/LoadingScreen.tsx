import { useEffect } from 'react'

export const LoadingScreen = () => {
    useEffect(() => {
        const styleSheet = document.styleSheets[0]

        const keyframes = `@keyframes pulse {
        0%, 100% {
          background-color: #f3f4f6; /* gray-100 */
        }
        50% {
          background-color: #d1d5db; /* gray-300 */
        }
      }`

        styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
    }, [])

    const loadingStyle = {
        animation: 'pulse 2s ease-in-out infinite',
    }

    return (
        <div className="flex  justify-center min-h-screen">
            <div style={loadingStyle} className="rounded-2xl p-10 w-full h flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="favicon-512x512.png" alt="Logo" className="w-44 h-44" />
            </div>
        </div>
    )
}
