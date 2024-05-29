import { Skeleton } from '@navikt/ds-react'

export const Spinner = () => {
    return (
        <>
            <Skeleton className={'w-full p-4 h-80 mb-1'} />
            <Skeleton className={'w-full p-4 h-80 mb-1'} />
        </>
    )
}
