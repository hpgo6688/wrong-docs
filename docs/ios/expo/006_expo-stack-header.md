## 配置

![alt text](image-7.png)

```tsx
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50', // 设置背景色
      },
      headerTintColor: '#fff', // 设置文本颜色
    });
  }, [navigation]);


```
![alt text](image-10.png)
