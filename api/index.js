/**
 * 【模块功能：狭海的走私长船 (The Smuggler's Ship across the Narrow Sea)】
 * 升级版：暴力抓取全路径，完美免疫 URL 特殊字符截断。
 */

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const reqUrl = req.url;
    // 寻找 url= 的起点
    const urlIndex = reqUrl.indexOf('url=');
    
    if (urlIndex === -1) {
      return new Response("【狭海驿站】引擎运转正常。正确用法请在结尾加上 ?url=您的机场链接", { status: 200 });
    }
    
    // 【核心修复：暴力截取 url= 后面的所有内容，防止 token 丢失】
    let targetUrl = reqUrl.substring(urlIndex + 4);
    
    // 兼容可能存在的 URL 编码
    if (targetUrl.startsWith('http%3A') || targetUrl.startsWith('https%3A')) {
      targetUrl = decodeURIComponent(targetUrl);
    }

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
        "Access-Control-Allow-Origin": "*",
        "Content-Type": response.headers.get("content-type") || "text/plain; charset=utf-8"
      }
    });
  } catch (error) {
    return new Response(`【代理引擎熔断】: ${error.message}`, { status: 500 });
  }
}
