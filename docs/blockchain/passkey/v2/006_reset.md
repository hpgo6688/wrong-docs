
```plantuml
Participant User
Participant Frontend
Participant Backend
Participant Admin
title: 账号恢复 [用户丢失设备、 系统重装]



User -> Frontend: Access web page
group #6CA6CD Valid work email
  alt 校验通过
      User->Frontend: 重置页面，输入work email邮箱
      Frontend->Frontend: 校验工作邮箱规则
  else 校验失败
      Frontend->Frontend: 显示错误信息
      destroy Frontend
  end
end

group #6CA6CD Google OIDC <color #ff00ff>【可选：】</color>
Frontend -> Google: HTTP redirect to OIDC provider\nwith nonce set to H(email, random)

User -> Google: Authenticate via password or cookie

Google -> Frontend: <color green> jwt, σ_G = Sign(GSK, jwt) ✅</color>
note right
    {
      "sub": "uid-123",
      "aud": "wallet-console",
      "nonce": H(email, random)
    }
end note
end

group New Passkey Create <color #ff0000>同一个userId 进行覆盖</color>
User -> Frontend: 完成输入，点击continue
Frontend -> Backend: 传递邮箱，获取challenge
Backend -> Frontend: 返回challenge
Frontend -> Frontend:  <color #ff00ff>【可选：】</color><color #6CA6CD>计算real challenge: H (backend challenge + email + "recover_action")</color>
User <- Frontend: 请求注册passkey
User -> Frontend: 选择Google 密码管理，进行生物识别注册passkey
Frontend-> Backend: 传递注册的cred + challenge信息到服务器
Backend->Backend: 新cred 落库<color #6CA6CD>（超时删除？）</color>
end

group 人工确认
User -> Admin: Slack联系管理员，重置passkey
alt 审批通过
Admin -> Backend: 管理员审批通过，重置用户passkey

else 审批不通过
Admin <- Backend: 管理员审批不通过，删除新cred
end
end
```