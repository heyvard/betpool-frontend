import React from 'react'

export const BpCard = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
    return <div className={'my-4 p-4 shadow bg-bg-subtle rounded-xl'}>{children}</div>
}
