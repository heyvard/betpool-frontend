import { createRemoteJWKSet, FlattenedJWSInput, JWSHeaderParameters, jwtVerify } from 'jose'
import { GetKeyFunction, JWTVerifyResult, ResolvedKey } from 'jose/dist/types/types'

let _remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>

async function validerToken(token: string | Uint8Array): Promise<JWTVerifyResult & ResolvedKey> {
    return jwtVerify(token, await jwks(), {
        issuer: 'https://securetoken.google.com/betpool-2022',
        audience: 'betpool-2022',
    })
}

async function jwks(): Promise<GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>> {
    if (typeof _remoteJWKSet === 'undefined') {
        _remoteJWKSet = createRemoteJWKSet(
            new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'),
        )
    }

    return _remoteJWKSet
}

export async function verifiserIdToken(token: string): Promise<(JWTVerifyResult & ResolvedKey) | undefined> {
    const verified = await validerToken(token)

    if (verified.payload.aud !== 'betpool-2022') {
        return undefined
    }
    if (verified.payload.iss !== 'https://securetoken.google.com/betpool-2022') {
        return undefined
    }

    return verified
}
