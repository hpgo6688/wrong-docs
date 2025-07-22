Cosmos 的 REST API 提供了多种接口，以下是一些常见的接口及其功能：

1. **账户查询**：
   - `/cosmos/auth/v1beta1/accounts/{address}`: 获取指定账户的信息。

2. **余额查询**：
   - `/cosmos/bank/v1beta1/balances/{address}`: 查询账户余额。

3. **交易查询与广播**：
   - `/cosmos/tx/v1beta1/txs/{tx_hash}`: 根据交易哈希查询交易详情。
   - `/cosmos/tx/v1beta1/txs`: 广播新的交易。

4. **区块信息**：
   - `/cosmos/base/tendermint/v1beta1/blocks/{height}`: 获取指定高度的区块信息。

5. **验证人信息**：
   - `/cosmos/staking/v1beta1/validators`: 查询所有验证人的信息。

6. **治理查询**：
   - `/cosmos/gov/v1beta1/proposals`: 获取治理提案列表。
   - `/cosmos/gov/v1beta1/proposals/{proposal_id}`: 获取特定提案的详细信息。

7. **委托和质押**：
   - `/cosmos/staking/v1beta1/delegations/{delegator_address}`: 查询委托信息。
   - `/cosmos/staking/v1beta1/validators/{validator_address}/delegations`: 获取某验证人的所有委托信息。

这些接口帮助开发者与 Cosmos 网络进行各种交互，如查询账户状态、广播交易、获取链上数据等。


```sh
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/bank/v1beta1/balances/cosmos12w2sgpq385upxxhvmkc9m6txk6cr94yzvmjc5z"
```

## example

当然！以下是使用 `curl` 命令查询 Cosmos REST API 的一些示例：

### 1. 查询账户余额

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/bank/v1beta1/balances/{address}"
```

替换 `{address}` 为目标账户地址。

### 2. 查询账户信息

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/auth/v1beta1/accounts/{address}"
```

替换 `{address}` 为目标账户地址。

### 3. 查询交易详情

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/tx/v1beta1/txs/{tx_hash}"
```

替换 `{tx_hash}` 为目标交易哈希。

### 4. 查询区块信息

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/base/tendermint/v1beta1/blocks/{height}"
```

替换 `{height}` 为目标区块高度。

### 5. 查询验证人信息

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/staking/v1beta1/validators"
```

### 6. 查询治理提案列表

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/gov/v1beta1/proposals"
```

### 7. 查询特定提案详情

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/gov/v1beta1/proposals/{proposal_id}"
```

替换 `{proposal_id}` 为目标提案 ID。

### 8. 查询委托信息

```bash
curl -X GET "https://rest.testcosmos.directory/cosmosicsprovidertestnet/cosmos/staking/v1beta1/delegations/{delegator_address}"
```

替换 `{delegator_address}` 为目标委托地址。

这些示例可以帮助你与 Cosmos 网络进行各种查询。请确保将占位符替换为实际的参数值。