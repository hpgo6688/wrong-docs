## ACM 不支持为 ELB 的默认域名

是的，ACM 不支持为 ELB 的默认域名（如 `*.elb.amazonaws.com` ）直接获取证书。你需要使用自己的自定义域名。以下是步骤：

1. **使用自定义域名**：
   - 确保你拥有一个自定义域名。
   - 在你的 DNS 提供商处，将该域名的 CNAME 记录指向 ELB 的 DNS 名称。

2. **获取证书**：
   - 使用 Certbot 通过 DNS-01 验证获取该自定义域名的证书。

3. **上传证书到 ACM**：
   - 将 Certbot 获取的证书上传到 AWS ACM。

4. **配置 ELB**：
   - 在 ELB 的监听器中使用上传到 ACM 的证书。

通过这种方式，你可以使用自定义域名来配置 ELB 的 SSL/TLS。

## AWS 直接通过域名打到 elb上？

AWS 允许你通过自定义域名指向 ELB，但不直接支持通过 ELB 提供的默认域名（如 `nlb-ops-1e44c19db954fff3.elb.ap-southeast-1.amazonaws.com` ）获取公共证书。要使用自定义域名指向 ELB，步骤如下：

### 设置自定义域名指向 ELB

1. **注册域名**：
   - 在任何域名注册商处注册一个域名。

2. **配置 DNS**：
   - 使用 AWS Route 53 或其他 DNS 提供商。
   - 创建一个 CNAME 记录，将你的自定义域名（如 `www.yourdomain.com` ）指向 ELB 的 DNS 名称（如 `nlb-ops-1e44c19db954fff3.elb.ap-southeast-1.amazonaws.com` ）。

3. **获取证书**：
   - 使用 AWS Certificate Manager (ACM) 为自定义域名请求证书。
   - 验证域名所有权（通常通过 DNS 验证）。

4. **配置 ELB**：
   - 在 ELB 的监听器设置中，选择使用 ACM 中的证书以启用 HTTPS。

这样，你就可以通过自定义域名访问 ELB，并使用 HTTPS 进行安全通信。

## 直接使用 ELB 的DNS会有什么问题？

直接使用 ELB 的默认 DNS 名称（如 `nlb-ops-1e44c19db954fff3.elb.ap-southeast-1.amazonaws.com` ）有以下几个问题：

1. **证书问题**：
   - AWS Certificate Manager (ACM) 不支持为 ELB 的默认域名申请公共证书。你无法为这些域名配置 HTTPS。

2. **品牌形象**：
   - 使用默认的 ELB 域名看起来不专业，不利于品牌形象。

3. **SEO 和用户体验**：
   - 自定义域名有助于搜索引擎优化（SEO）和用户记忆。默认域名较长且不易记忆。

4. **灵活性**：
   - 自定义域名允许你在不改变用户访问地址的情况下切换到其他负载均衡器或服务。

为了克服这些限制，建议使用自定义域名，并通过 DNS 将其指向 ELB。这样，你可以使用 ACM 申请证书，并在 ELB 上配置 HTTPS。

## AWS Certificate Manager (ACM) 不支持为 ELB 的默认域名申请公共证书。你无法为这些域名配置 HTTPS 。 可以使用自签证书？

是的，你可以为 ELB 使用自签名证书，但这通常不推荐用于生产环境。以下是一些原因：

1. **信任问题**：
   - 自签名证书不被浏览器信任，用户会看到安全警告。

2. **用户体验**：
   - 安全警告会影响用户体验，可能导致用户流失。

3. **安全性**：
   - 自签名证书不提供与公共证书相同的信任级别。

在生产环境中，建议使用 AWS Certificate Manager (ACM) 为自定义域名申请公共证书，这样可以确保用户的连接是安全的，并提供更好的用户体验。

## 命令

当然可以！以下是完整的命令步骤：

1. **生成私钥**：
   

```bash
   openssl genrsa -out private.key 2048
```

2. **生成证书签名请求 (CSR)**：
   

```bash
openssl req -new -key private.key -out certificate.csr -subj "/C=US/ST=State/L=City/O=cmex/OU=tech/CN=nlb-ops-1e44c19db954fff3.elb.ap-southeast-1.amazonaws.com"
```

3. **生成自签名证书**：
   

```bash
   openssl x509 -req -days 3650 -in certificate.csr -signkey private.key -out certificate.crt
```

这样就可以生成一个自签名证书 `certificate.crt` 和对应的私钥 `private.key` 。请记住，自签名证书在浏览器中会显示安全警告。

## link

https://docs.aws.amazon.com/zh_cn/elasticloadbalancing/latest/classic/ssl-server-cert.html

https://docs.aws.amazon.com/zh_cn/elasticloadbalancing/latest/classic/ssl-server-cert.html#import-certificate-iam

https://alejandrocelaya.blog/2016/08/16/setup-a-lets-encrypt-certificate-in-a-aws-elastic-load-balancer/

https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-update-ssl-cert.html#us-update-lb-SSLcert-cli
