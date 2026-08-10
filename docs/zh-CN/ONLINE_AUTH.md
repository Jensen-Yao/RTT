# RTT 在线账户部署

RTT Web、Android 与 Windows 统一使用 Supabase 邮箱密码登录和 GitHub OAuth。未配置 Supabase 或没有有效会话时，工作台保持锁定；RTT 不提供离线账户。

## 1. 创建并连接项目

```powershell
F:\tools\supabase-cli\supabase.exe login
F:\tools\supabase-cli\supabase.exe link --project-ref <project-ref> --workdir F:\RTT
F:\tools\supabase-cli\supabase.exe db push --workdir F:\RTT
```

迁移会创建 `profiles`、`user_preferences`、`capability_profiles`、`rtt_user_credentials` 和 `rtt_credential_audit`。普通账户资料和能力档案启用 RLS；云端密钥表撤销浏览器与普通数据库角色的直接访问，只能通过 `rtt-credentials` Edge Function 操作。API Key 使用服务端 AES-256-GCM 主密钥加密，数据库只保存密文、IV、指纹和同步元数据；密码由 Supabase Auth 管理，模型文件、音频、字幕和译文正文不得写入这些表。

Android 先把密钥写入 Keystore，再记录不含明文的持久化同步操作。断网或暂未登录时，保存和删除操作会保留到后续登录、会话恢复或网络重试；登录合并云端副本前会先应用本机待处理删除。云端为删除操作保留不含密钥的墓碑记录，三端登录时会清理本机旧副本，避免旧设备重新创建已删除密钥。

## 2. 配置 Web 公共变量

构建站点时设置：

```text
PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<publishable-anon-key>
RTT_SITE_URL=https://rtt.jenseny.top
```

`PUBLIC_SUPABASE_ANON_KEY` 是允许公开给浏览器的 publishable/anon key，不得使用 `service_role` key。

## 3. 配置 Auth URL

Supabase Auth 的 Site URL 建议设为：

```text
https://rtt.jenseny.top/app/
```

Redirect URLs 至少加入：

```text
https://rtt.jenseny.top/app/**
https://rtt.jenseny.top/en/app/**
https://rtt.jenseny.cn/app/**
https://rtt.jenseny.cn/en/app/**
https://jensen-yao.github.io/RTT/app/**
https://jensen-yao.github.io/RTT/en/app/**
```

本地开发再加入 `http://127.0.0.1:4321/app/**`、`http://localhost:4321/app/**` 以及实际使用的预览端口。尾部通配符用于邮箱验证、GitHub OAuth 和密码恢复查询参数。

## 4. 配置 GitHub OAuth

在 GitHub 创建 OAuth App。Authorization callback URL 使用 Supabase 项目回调地址：

```text
https://<project-ref>.supabase.co/auth/v1/callback
```

然后在 Supabase Authentication Providers 中启用 GitHub，并填写 Client ID 和 Client Secret。生产密钥只放 Supabase 控制台或 CI Secret，不提交到仓库。

## 5. 验收

1. 用邮箱注册并完成邮件验证。
2. 用 GitHub 登录，确认可返回两个自定义域名的工作台。
3. 在浏览器刷新后确认会话恢复。
4. 修改显示名称后，在 Web、Android 与 Windows 重新登录并确认名称一致。
5. 从三端登录页发起密码重置，确认邮件链接返回 Web 的“设置新密码”页面。
6. 用户 A 不能读取、修改或删除用户 B 的资料和能力档案。
7. 检查 `rtt_user_credentials` 中只有密文、IV、指纹和元数据，不存在 API Key 明文、字幕正文或模型文件。
8. Android 断网保存并删除一个测试密钥，恢复网络并重新登录，确认 Web 与 Windows 得到最终状态且审计表记录同步操作。
