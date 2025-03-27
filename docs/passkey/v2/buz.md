```plantuml
Participant User
Participant Frontend
Participant Backend
Participant Admin
title: 登录态管理
group 停用
Admin->Backend: 回收用户权限
end

group 登录态管理
Admin->Backend: token失效or手动清理redis(用其它也行)中用户token
end

```