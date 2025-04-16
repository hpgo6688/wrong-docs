```ts
import { SignJWT, exportJWK, generateKeyPair } from 'jose'

// 1️⃣ 生成 ES256 密钥对（P-256）
const { publicKey, privateKey } = await generateKeyPair('ES256', {
	extractable: true,
})

// 2️⃣ 使用 jose 进行签名（JWT）
// const jwt = await new SignJWT({ hello: 'world' }).setProtectedHeader({ alg: 'ES256' }).setIssuedAt().setExpirationTime('2h').sign(privateKey)

// console.log('✅ JWT 签名:', jwt)

// 3️⃣ 导出为 JWK（以便用于 ECDH）
const privateJwk = await exportJWK(privateKey)
const publicJwk = await exportJWK(publicKey)

console.log('🔐 ES256 私钥 JWK:', privateJwk)
console.log('🔓 ES256 公钥 JWK:', publicJwk)

// 4️⃣ 重新导入为 ECDH 密钥（注意修改用途和算法）
privateJwk.key_ops = ['deriveBits']

const ecdhPrivateKey = await crypto.subtle.importKey('jwk', privateJwk, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits'])

// 模拟对方 ECDH 公钥（也可以用 jose 生成）
const { publicKey: peerPublicKey } = await generateKeyPair('ES256', {
	extractable: true,
})

const peerPublicJwk = await exportJWK(peerPublicKey)
peerPublicJwk.key_ops = []
const ecdhPeerPublicKey = await crypto.subtle.importKey('jwk', peerPublicJwk, { name: 'ECDH', namedCurve: 'P-256' }, false, [])

// 5️⃣ 派生共享密钥（ECDH）
const sharedSecret = await crypto.subtle.deriveBits(
	{
		name: 'ECDH',
		public: ecdhPeerPublicKey,
	},
	ecdhPrivateKey,
	256, // 对于 P-256，必须是 256 bits
)

console.log('🔑 派生共享密钥 (hex):', [...new Uint8Array(sharedSecret)].map((b) => b.toString(16).padStart(2, '0')).join(''))

// 6️⃣ 可选：导入为 AES-GCM 密钥
const aesKey = await crypto.subtle.importKey('raw', sharedSecret, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'])

console.log('✅ AES 密钥已准备好，可用于加密通信')

```
