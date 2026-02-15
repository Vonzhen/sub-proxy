/**
 * 【模块功能：狭海的走私长船 (The Smuggler's Ship across the Narrow Sea)】
 * 依托 Vercel Edge Runtime 部署的无服务器代理中转站。
 * 利用 AWS/GCP 的纯洁 IP 绕过针对 Cloudflare 的物理封锁。
 */

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response("【系统架构师警告】缺少目标 URL 参数", { status: 400 });
  }

  try {
    // 【模块逻辑：伪造信使身份强行叩门】
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "ClashforWindows/0.20.39",
        "Accept": "*/*"
      }
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        // 【人为提示：发放全域通行证】
        "Access-Control-Allow-Origin": "*",
        "Content-Type": response.headers.get("content-type") || "text/plain; charset=utf-8"
      }
    });
  } catch (error) {
    return new Response(`【代理引擎熔断】: ${error.message}`, { status: 500 });
  }
}
