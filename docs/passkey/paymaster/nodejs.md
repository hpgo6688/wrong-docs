```js
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const PIMLICO_API_URL = 'https://api.pimlico.io/v2/84532/rpc?apikey=pim_48H8jTyfc4ADJ6pukGjsh8'
const ALCHEMY_API_URL = 'https://base-sepolia.g.alchemy.com/v2/1sBw-JGMmDsu6fRi-peC0h58TOrRVrip'

const chainId_hex = '0x14a34'
const entrypoint = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'

app.post('/ping', (req, res) => {
    console.log('pong')
    res.json({
        jsonrpc: '2.0',
        result: 'pong'
    })
})

app.post('/', async (req, res) => {
    const {
        headers,
        body
    } = req
    const proxyMethod = headers['x-proxy-jsonrpc-method']

    if (proxyMethod === 'eth_estimateUserOperationGas') {
        try {
            const stubDataResponse = await axios.post(PIMLICO_API_URL, {
                jsonrpc: '2.0',
                method: 'pm_getPaymasterStubData',
                params: [body.params[0], entrypoint, chainId_hex, null],
                id: body.id,
            })

            const userOpWithStub = {
                ...body.params[0],
                ...stubDataResponse.data.result
            }

            const estimateGasResponse = await axios.post(ALCHEMY_API_URL, {
                jsonrpc: '2.0',
                method: 'eth_estimateUserOperationGas',
                params: [userOpWithStub, entrypoint],
                id: body.id,
            })

            const estimatedGas = estimateGasResponse.data.result

            const paymasterDataResponse = await axios.post(PIMLICO_API_URL, {
                jsonrpc: '2.0',
                method: 'pm_getPaymasterData',
                params: [{
                    ...userOpWithStub,
                    ...estimatedGas
                }, entrypoint, chainId_hex],
                id: body.id,
            })

            const combinedResult = {
                ...estimatedGas,
                paymasterAndData: paymasterDataResponse.data.result.paymasterAndData,
            }

            res.json({
                jsonrpc: '2.0',
                result: combinedResult,
                id: body.id
            })
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message)
            res.status(500).json({
                jsonrpc: '2.0',
                error: {
                    code: -32603,
                    message: 'Internal error'
                },
                id: body.id,
            })
        }
    } else {
        try {
            const response = await axios.post(ALCHEMY_API_URL, body)
            res.json(response.data)
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message)
            res.status(500).json({
                jsonrpc: '2.0',
                error: {
                    code: -32603,
                    message: 'Internal error'
                },
                id: body.id,
            })
        }
    }
})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
```
