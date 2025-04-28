## wallet_generateOIDCNonce

参数

```ts
{ originOwner: string }
```

## wallet_prepareSocialBindUserOperation

参数

```ts
{
  originOwner: string
  currentOwner: string
  jwt: string
}
```

## wallet_submitSocialBindUserOperation

参数

```ts
{
  currentOwner: string,
  assertionResponse: {
    clientDatats: string
    authenticatorData: string
    signature: string
  },
  challenge: string
  userOperation: {
    sender: string
    nonce: string
    initCode: string
    callData: string
    callGasLimit: string
    verificationGasLimit: string
    preVerificationGas: string
    maxFeePerGas: string
    maxPriorityFeePerGas: string
    paymasterAndData: string
    signature: string
  },
  originOwner: string // zkp drive contract address
  extra?: string
}
```

## wallet_prepareSocialRecovery

参数

```ts
{
  originOwner: string
  currentOwner: string
  newOwner: string
  extra?: string
}
```

## wallet_submitSocialRecovery

参数

```ts
{
  jwt: string
  originOwner: string // zkp drive contract address
}
```
