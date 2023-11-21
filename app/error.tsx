"use client";
import { Button } from "@/components/ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="fixed md:inset-60 flex flex-col gap-6 p-6 rounded-lg shadow-md justify-center items-center">
      <h2 className="text-3xl text-red-600 font-bold">Something went wrong!</h2>
      <h3 className="text-lg text-gray-700">
        请检查您是否启用了浏览器的翻译插件。此类插件会改变DOM，导致 React 尝试移除一个子节点时找不到该节点。
        <a
          href="https://github.com/facebook/react/issues/17256"
          rel="noreferrer noopener"
          className='underline underline-offset-1'
          target='_blank'
        >
          了解更多
        </a>
      </h3>
      <p className="text-gray-600">Error: {error.message}</p>
      <p className="mt-4 text-xl font-bold">解决方法</p>
      <ul className="list-disc list-inside pl-5">
        <li className="text-gray-600">暂时关闭翻译插件并刷新页面</li>
        <li className="text-gray-600">
          勾选“Open In New Tab”，在新标签页中加载页面
        </li>
        <li className="text-gray-600">请避免在页面被翻译时进行筛选等操作</li>
      </ul>
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
}
