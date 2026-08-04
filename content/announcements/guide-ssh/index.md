---
title: 网协堡垒机使用指南
time: 2026-8-3
hidden: false
meta:
---
---

# 首次登录

使用统一认证打开堡垒机页面

MFA 多因子验证建议您开启 协会核心管理人员必须开启

勾选我同意点击提交

若您没有相关密码管理程序的话 推荐您使用腾讯身份验证器 微信小程序

![d0eb1e5c-5c8f-4a88-92d2-909dc4b7f097](https://www.gwy.fun/blog_ima/blog/d0eb1e5c-5c8f-4a88-92d2-909dc4b7f097.png)

可以点击左侧选择资产 也可以进入 web 终端（推荐）

![d73d6bf1562891d457bf1e05ce2f4e52](https://www.gwy.fun/blog_ima/blog/d73d6bf1562891d457bf1e05ce2f4e52.png)

# 主机类型资产维护

## 网页直接管理

![ad12ca85-f3cf-48ab-bf6b-cc9cc6c6b0dc](https://www.gwy.fun/blog_ima/blog/ad12ca85-f3cf-48ab-bf6b-cc9cc6c6b0dc.png)

## SSH 连接

::: warning 重要

**该连接方式仅限校内**

:::

使用 ssh 连接建议您开启 MFA 验证

首先登录平台完成SSH 公钥创建

![afc55bf0-beac-45e9-9a4f-c7c98ed5fe74](https://www.gwy.fun/blog_ima/blog/afc55bf0-beac-45e9-9a4f-c7c98ed5fe74.png)

```shell
mkdir -p ~/.ssh
mv ~/Downloads/test.jumpserver.pem ~/.ssh/
chmod 600 ~/.ssh/test.jumpserver.pem
ssh -i ~/.ssh/test.jumpserver.pem -p 2233 username@server-1.sxu-cnta.cn
```

替换 username 为您的用户名 替换test.jumpserver.pem为您实际下载的文件名称

您也可以把密钥文件传入到您使用的运维终端软件中使用 

主机 server-1.sxu-cnta.cn 端口 2233