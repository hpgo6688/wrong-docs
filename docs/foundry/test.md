# `vm.expectEmit(true, true, false, false);`

```
`vm.expectEmit(true, true, false, false);` 总是有 4 个布尔参数，用于控制事件匹配：

1. **`checkTopic1`**: 检查 `topics[1]`（第一个 `indexed` 参数）。
2. **`checkTopic2`**: 检查 `topics[2]`（第二个 `indexed` 参数）。
3. **`checkTopic3`**: 检查 `topics[3]`（第三个 `indexed` 参数）。
4. **`checkData`**: 检查 `data`（非 `indexed` 参数）。

这些参数决定哪些部分需要匹配，`false` 表示不检查该部分。即使数据不同，只要未被检查，测试仍可能通过。
```

# `vm.expectCall`

在 Foundry（Forge）中， `vm.expectCall` 有 **四种不同的函数签名**，用于不同的测试场景。让我们依次解析它们的用法。

---

## **1. `vm.expectCall(address target, bytes calldata data)` **

**作用**：检查是否对 `target` 地址进行了指定的调用，并且调用的数据（ `data` ）必须匹配。

**示例**：

```solidity
vm.expectCall(address(otherContract), abi.encodeWithSignature("someFunction(uint256)", 123));
myContract.callFunctionThatCallsOtherContract();
```

* 这里 `myContract.callFunctionThatCallsOtherContract();` 需要在内部调用 `otherContract.someFunction(123)`，否则测试失败。

---

## **2. `vm.expectCall(address target, bytes calldata data, uint64 count)` **

**作用**：和第一种类似，但额外指定了调用的次数 `count` 。

**示例**：

```solidity
vm.expectCall(address(otherContract), abi.encodeWithSignature("someFunction(uint256)", 123), 2);
myContract.callFunctionThatCallsOtherContract();
```

* 这里 `myContract.callFunctionThatCallsOtherContract();` 必须 **恰好** 调用 `otherContract.someFunction(123)` **两次**，否则测试失败。

---

## **3. `vm.expectCall(address target, uint256 value, bytes calldata data)` **

**作用**：除了检查 `target` 和 `data` ，还额外检查 `msg.value` （发送的 ETH 数量）。

**示例**：

```solidity
vm.expectCall(address(otherContract), 1 ether, abi.encodeWithSignature("someFunction(uint256)", 123));
myContract.callFunctionThatSendsEther();
```

* 这里 `myContract.callFunctionThatSendsEther();` 需要：
  1. 调用 `otherContract.someFunction(123)`
  2. 发送 **1 ether**
* 如果 `msg.value` 不是 1 ether，测试失败。

---

## **4. `vm.expectCall(address target, uint256 value, bytes calldata data, uint64 count)` **

**作用**：结合了 **ETH 发送量** 和 **调用次数**，即：
* `target` 必须被调用。
* `data` 必须匹配。
* `msg.value` 必须匹配。
* 调用次数 `count` 必须匹配。

**示例**：

```solidity
vm.expectCall(address(otherContract), 1 ether, abi.encodeWithSignature("someFunction(uint256)", 123), 2);
myContract.callFunctionThatSendsEther();
```

* 这里 `myContract.callFunctionThatSendsEther();` 必须：
  1. **两次** 调用 `otherContract.someFunction(123)`
  2. 每次调用都发送 **1 ether**
* 如果调用次数、ETH 发送量或数据不匹配，测试失败。

---

## **总结**

| 函数签名 | 作用 |
|----------|------|
| `vm.expectCall(address target, bytes calldata data)` | 期望 `target` 被调用，并且 `data` 必须匹配 |
| `vm.expectCall(address target, bytes calldata data, uint64 count)` | 期望 `target` 被调用 `count` 次，并且 `data` 必须匹配 |
| `vm.expectCall(address target, uint256 value, bytes calldata data)` | 期望 `target` 被调用，并且 `data` 和 `msg.value` 必须匹配 |
| `vm.expectCall(address target, uint256 value, bytes calldata data, uint64 count)` | 期望 `target` 被调用 `count` 次，并且 `data` 和 `msg.value` 必须匹配 |

这些方法可以帮助你确保合约在执行过程中正确地调用了其他合约，并传递了正确的参数和 ETH。

# `function createFork(string calldata urlOrAlias, bytes32 transaction) external returns (uint256);`

`vm.createFork(string calldata urlOrAlias, bytes32 transaction)` 是 Foundry（Forge）提供的 **分叉测试（fork testing）** 方法之一。它的作用是：

* **基于给定的 RPC 端点（或别名）创建一个新的区块链分叉**。
* **回溯到包含指定交易（`transaction`）的区块**，并 **重放** 该交易之前的所有交易。
* **返回分叉的 ID**，用于后续 `vm.selectFork(forkId)` 切换到该分叉。

---

## **用法**

```solidity
uint256 forkId = vm.createFork("https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY", txHash);
vm.selectFork(forkId);
```

* `urlOrAlias`：可以是 **RPC URL**（如 Alchemy、Infura）或 Foundry 配置的 **别名**（如 `"mainnet"`）。
* `transaction`：交易哈希（`bytes32`），用于确定分叉的区块高度。

---

## **示例**

### **1. 在测试中创建分叉并回溯到某个交易**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

contract ForkTest is Test {
    function testForkFromTransaction() external {
        // 以太坊主网 RPC URL（可用 Foundry 配置的别名 "mainnet"）
        string memory rpcUrl = "mainnet";

        // 目标交易哈希（例如某个 Uniswap 交易）
        bytes32 txHash = 0x5a3b4c...; // 交易哈希（需替换）

        // 创建分叉，并回溯到该交易所在的区块
        uint256 forkId = vm.createFork(rpcUrl, txHash);

        // 选择该分叉，使其成为当前执行环境
        vm.selectFork(forkId);

        // 现在，测试环境处于该交易发生之前的状态
        assertEq(block.number, vm.getTxBlockNumber(txHash));
    }
}
```

---

## **2. 适用场景**

* **回溯到某个交易发生之前，分析交易影响**。
* **重放交易，模拟不同状态**（如不同的 `msg.sender` 或 `msg.value`）。
* **测试合约在历史状态下的行为**，比如：
  + 交易是否会失败？
  + 交易的 Gas 费用是多少？
  + 交易执行后，某个账户的余额是否变化？

---

## **3. `createFork` vs `createSelectFork` **

| 方法 | 作用 |
|------|------|
| `vm.createFork(string calldata urlOrAlias, bytes32 transaction)` | 创建一个新的分叉，并回溯到该交易发生之前的状态，返回 `forkId` 。需要手动 `vm.selectFork(forkId)` 进行切换。 |
| `vm.createSelectFork(string calldata urlOrAlias, bytes32 transaction)` | **创建并自动切换** 到该分叉，省略 `vm.selectFork(forkId)` 。 |

**示例**：

```solidity
vm.createSelectFork("mainnet", txHash); // 直接创建并切换
```

---

## **总结**

*`vm.createFork(urlOrAlias, transaction)`**创建一个新的分叉，并回溯到指定交易发生之前的状态**。
* 适用于 **分析历史交易**，**重放交易**，**测试合约在特定区块的状态**。
* 需要手动 `vm.selectFork(forkId)` 切换到该分叉。
* `vm.createSelectFork(urlOrAlias, transaction)` 是 **简化版**，创建后直接切换。

如果你有具体的测试需求，可以提供交易哈希和 RPC 端点，我可以帮你写更详细的测试代码！ 🚀

# makePersistent 是将交易的状态持久化，以便之后在这个交易基础上继续交易？假设A钱包有钱，B钱包没钱，我想做一个B钱包对C的交易，我需要先将A钱包转账到B钱包，持久化，之后，可以操作B钱包给C钱包转账

是的， `vm.makePersistent` 在 Foundry（Forge）中用于 **持久化合约或账户的状态**，确保它们在不同的测试步骤之间不会被回滚。你的理解基本正确，但 `makePersistent` 主要用于 **合约的存储状态**，而 **账户余额等 EVM 状态** 需要特殊处理。

---

## ** `vm.makePersistent` 的作用**

在 Foundry 的测试环境中，**如果一个合约在测试中未被持久化（Persistent），那么在测试结束后它的状态会被回滚**。这意味着：
* 如果你 **部署了一个合约**，但没有 `makePersistent`，它的状态在下一个测试步骤可能会丢失。
*`makePersistent`**不会直接持久化账户余额**，但可以让合约的存储状态在多个测试步骤中保持不变。

---

## **你的需求：A → B（持久化）→ B → C**

你希望：
1. **A 给 B 转账**（让 B 有钱）。
2. **持久化 B 的状态**，确保 B 余额不会丢失。
3. **B 给 C 转账**。

### **方法 1：直接使用 `deal` 设置余额**

在 Foundry 中，**账户余额不会自动回滚**，所以你可以直接用 `vm.deal(address, amount)` 来修改账户余额，而不需要 `makePersistent` ：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

contract PersistentTest is Test {
    address A = address(0xA);
    address B = address(0xB);
    address C = address(0xC);

    function testPersistentTransfer() external {
        // 1. 让 A 账户有 100 ETH
        vm.deal(A, 100 ether);
        assertEq(A.balance, 100 ether);

        // 2. A 给 B 转账 50 ETH
        vm.prank(A); // 伪装成 A 进行交易
        payable(B).transfer(50 ether);
        assertEq(B.balance, 50 ether);

        // 3. B 给 C 转账 30 ETH
        vm.prank(B);
        payable(C).transfer(30 ether);
        assertEq(C.balance, 30 ether);
        assertEq(B.balance, 20 ether);
    }
}
```

**为什么 `deal` 就够了？**
* `deal(A, 100 ether)` 直接设置 A 账户的余额。
* 账户余额在测试过程中不会自动回滚，所以 B 的余额不会丢失。
* `prank(A)` 让 A 发送交易，`prank(B)` 让 B 发送交易。

---

### **方法 2：如果 B 是合约，使用 `makePersistent` **

如果 `B` 是一个合约，并且你希望它的 **存储状态**（比如映射 `balances` ）在多个测试步骤中保持不变，你可以使用 `vm.makePersistent(B)` ：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

contract Wallet {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(to).transfer(amount);
    }
}

contract PersistentTest is Test {
    Wallet B;
    address C = address(0xC);

    function setUp() external {
        B = new Wallet();
        vm.makePersistent(address(B)); // 让 B 持久化
    }

    function testPersistentContract() external {
        // 1. 让 B 账户有 50 ETH
        vm.deal(address(B), 50 ether);
        assertEq(address(B).balance, 50 ether);

        // 2. B 给 C 转账 30 ETH
        vm.prank(address(B));
        B.transfer(C, 30 ether);

        assertEq(C.balance, 30 ether);
        assertEq(address(B).balance, 20 ether);
    }
}
```

**为什么 `makePersistent(B)` 重要？**
* `B` 是一个合约，合约的 **存储变量**（`balances`）在测试结束后默认会被回滚。
* `vm.makePersistent(B)` 让 `B` 的状态不会被自动清除，可以在多个测试步骤中保持不变。

---

## **总结**

| 方案 | 适用场景 | 代码示例 |
|------|----------|----------|
| **直接使用 `deal` ** | 账户余额不会回滚，不需要 `makePersistent` | `vm.deal(B, 50 ether);` |
| **使用 `makePersistent` ** | 让合约的存储状态（如 `mapping` ）持久化 | `vm.makePersistent(address(B));` |

你的情况 **只涉及账户余额**，所以 ** `deal` 足够**，不需要 `makePersistent` 。但如果 B 是合约，并且你想让它的 **存储变量**（如 `mapping` ）持久化，才需要 `vm.makePersistent(address(B))` 。

如果你的 `B` 是合约，并且有更多复杂的存储逻辑，可以告诉我，我可以帮你优化测试代码！ 🚀
