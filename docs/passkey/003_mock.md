```ts
'/api/v1/admin/user/policy': {
					target: proxy['mock'],
					changeOrigin: true,
					configure: (proxy, options) => {
						proxy.on('proxyReq', (proxyReq, req, res) => {
							console.log('Proxying request1:', req.method, req.url)
						})
						proxy.on('proxyRes', (proxyRes, req, res) => {
							console.log('Received response from target2:', proxyRes.statusCode)
						})
						proxy.on('error', (err, req, res) => {
							console.error('Proxy error3:', err)
						})
					},
				},
```
