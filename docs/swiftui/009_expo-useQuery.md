# doc
https://tanstack.com/query/v4/docs/framework/react/react-native

```tsx
function MyComponent() {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { dataUpdatedAt } = useQuery({
    queryKey: ['myKey'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/tannerlinsley/react-query');
      return response.json();
    },
    notifyOnChangeProps,
  });

  return <Text>DataUpdatedAt: {dataUpdatedAt}</Text>;
};
```


# example


在 React Native 中使用 `useQuery` 通常涉及到使用 Apollo Client 或 React Query。下面是两种常见库的使用示例：

### 使用 Apollo Client 的 `useQuery`

1. **安装 Apollo Client**

   ```bash
   npm install @apollo/client graphql
   ```

2. **设置 Apollo Client**

   ```javascript
   import React from 'react';
   import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

   const client = new ApolloClient({
     uri: 'https://your-graphql-endpoint.com/graphql',
     cache: new InMemoryCache(),
   });

   const App = () => (
     <ApolloProvider client={client}>
       <YourComponent />
     </ApolloProvider>
   );

   export default App;
   ```

3. **使用 `useQuery` Hook**

   ```javascript
   import React from 'react';
   import { useQuery, gql } from '@apollo/client';

   const GET_DATA = gql`
     query GetData {
       data {
         id
         name
       }
     }
   `;

   const YourComponent = () => {
     const { loading, error, data } = useQuery(GET_DATA);

     if (loading) return <Text>Loading...</Text>;
     if (error) return <Text>Error: {error.message}</Text>;

     return (
       <View>
         {data.data.map(item => (
           <Text key={item.id}>{item.name}</Text>
         ))}
       </View>
     );
   };
   ```

### 使用 React Query 的 `useQuery`

1. **安装 React Query**

   ```bash
   npm install @tanstack/react-query
   ```

2. **设置 Query Client**

   ```javascript
   import React from 'react';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

   const queryClient = new QueryClient();

   const App = () => (
     <QueryClientProvider client={queryClient}>
       <YourComponent />
     </QueryClientProvider>
   );

   export default App;
   ```

3. **使用 `useQuery` Hook**

   ```javascript
   import React from 'react';
   import { useQuery } from '@tanstack/react-query';

   const fetchData = async () => {
     const response = await fetch('https://your-api-endpoint.com/data');
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
   };

   const YourComponent = () => {
     const { isLoading, error, data } = useQuery(['data'], fetchData);

     if (isLoading) return <Text>Loading...</Text>;
     if (error) return <Text>Error: {error.message}</Text>;

     return (
       <View>
         {data.map(item => (
           <Text key={item.id}>{item.name}</Text>
         ))}
       </View>
     );
   };
   ```

这两种方法都可以用于在 React Native 中进行数据查询，具体选择哪种取决于你的项目需求和偏好。