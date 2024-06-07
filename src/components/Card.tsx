import React from 'react'

export const BpCard = ({ children, bg }: { children: React.ReactNode | React.ReactNode[]; bg?: string }) => {
    const background = bg ? bg : 'bg-white'
    return <div className={`${background} my-4 p-4 shadow rounded-xl`}>{children}</div>
}
