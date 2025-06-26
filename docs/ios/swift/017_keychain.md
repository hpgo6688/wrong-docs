## expo securestore

https://docs.expo.dev/versions/latest/sdk/securestore/


## 敏感数据存储


在 SwiftUI 中，虽然没有内建的 Keychain 支持，但你可以使用 `Keychain` 来安全地存储敏感数据。可以借助第三方库或使用 `Keychain Services` API。以下是一个简单示例，展示如何使用 `KeychainAccess` 库来管理 Keychain 中的数据：

### 使用 KeychainAccess 库

1. **安装 KeychainAccess**

   在你的 `Package.swift` 中添加：

   ```swift
   .package(url: "https://github.com/kishikawakatsumi/KeychainAccess.git", from: "4.2.2")
   ```

   或者在 Xcode 的 Swift Package Manager 中添加。

2. **使用 KeychainAccess**

   ```swift
   import SwiftUI
   import KeychainAccess

   struct ContentView: View {
       let keychain = Keychain(service: "com.example.myapp")

       @State private var username: String = ""
       @State private var password: String = ""

       var body: some View {
           VStack {
               TextField("Username", text: $username)
                   .textFieldStyle(RoundedBorderTextFieldStyle())
                   .padding()

               SecureField("Password", text: $password)
                   .textFieldStyle(RoundedBorderTextFieldStyle())
                   .padding()

               Button("Save") {
                   saveCredentials()
               }
               .padding()

               Button("Load") {
                   loadCredentials()
               }
               .padding()
           }
           .padding()
       }

       func saveCredentials() {
           do {
               try keychain.set(username, key: "username")
               try keychain.set(password, key: "password")
           } catch let error {
               print("Error saving to keychain: \(error)")
           }
       }

       func loadCredentials() {
           do {
               if let savedUsername = try keychain.get("username"),
                  let savedPassword = try keychain.get("password") {
                   username = savedUsername
                   password = savedPassword
               }
           } catch let error {
               print("Error loading from keychain: \(error)")
           }
       }
   }
   ```

### 注意事项

- **安全性**：Keychain 是存储敏感信息（如密码、令牌）的安全方式。
- **访问控制**：你可以设置访问控制选项，例如只有在设备解锁时才允许访问。
- **错误处理**：确保处理可能的错误，例如存储失败或读取失败。

使用 Keychain 可以帮助你安全地管理应用中的敏感数据。


## Keychain 真的安全吗？

Keychain 是一种非常安全的存储敏感数据的方法，尤其是在 iOS 和 macOS 上。它提供了以下安全特性：

1. **数据加密**：Keychain 会自动加密存储的数据，确保只有授权的应用才能访问。

2. **访问控制**：你可以设置访问控制策略，例如要求设备解锁才能访问数据。

3. **隔离性**：每个应用都有自己的 Keychain 存储空间，其他应用无法访问。

4. **系统管理**：Keychain 由操作系统管理，能抵御大多数常见的攻击。

5. **生物识别支持**：可以结合 Face ID 或 Touch ID 增强安全性。

尽管如此，开发者仍需注意：

- **确保代码安全**：防止代码注入或其他安全漏洞。
- **及时更新**：使用最新的安全库和系统更新。
- **权限管理**：仅请求必要的权限，避免过度授权。

总之，Keychain 是存储敏感信息的可靠选择，但仍需结合其他安全实践以确保应用的整体安全性。

## expo react-native 使用keychain



在 React Native 中使用 Keychain 来存储敏感信息，可以借助 `react-native-keychain` 库。以下是如何在 Expo 项目中使用它的步骤：

### 安装 `react-native-keychain`

1. **安装库**

   如果你使用的是裸 Expo 工作流（Bare Workflow），可以直接安装：

   ```bash
   expo install react-native-keychain
   ```

   如果你使用的是托管工作流（Managed Workflow），需要使用 `expo-dev-client`。

2. **配置项目**

   在裸工作流中，通常需要运行 `pod install` 来在 iOS 上链接库。

### 使用 `react-native-keychain`

```javascript
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as Keychain from 'react-native-keychain';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const saveCredentials = async () => {
    try {
      await Keychain.setGenericPassword(username, password);
      setMessage('Credentials saved successfully!');
    } catch (error) {
      setMessage('Could not save credentials. ' + error);
    }
  };

  const loadCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setMessage(`Username: ${credentials.username}, Password: ${credentials.password}`);
      } else {
        setMessage('No credentials stored.');
      }
    } catch (error) {
      setMessage('Could not load credentials. ' + error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Save" onPress={saveCredentials} />
      <Button title="Load" onPress={loadCredentials} style={{ marginTop: 10 }} />
      <Text style={{ marginTop: 20 }}>{message}</Text>
    </View>
  );
}
```

### 注意事项

- **安全性**：确保应用的其他部分也遵循安全实践。
- **生物识别**：`react-native-keychain` 支持使用 Face ID 或 Touch ID 进行身份验证。
- **平台支持**：该库支持 iOS 和 Android。

使用 `react-native-keychain` 可以帮助你在 React Native 应用中安全地管理敏感数据。