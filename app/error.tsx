"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <h3>
        请检查您是否启用了浏览器的翻译插件。此类插件会改变DOM，导致网页无法进行客户端导航
      </h3>
      <p>解决方法</p>
      <ul>
        <li>暂时关闭翻译插件并刷新页面</li>
        <li>勾选“Open In New Tab”，在新标签页中加载页面</li>
      </ul>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
