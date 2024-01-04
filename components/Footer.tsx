import React from "react";
import Link from "next/link";

const getActiveUsers = async () => {
  const id = process.env.NEXT_PUBLIC_WEBSITE_ID;
  const token = process.env.UMAMI_TOKEN;
  if (!id || !token) return null;
  const requestOptions: RequestInit = {
    headers: { Authorization: `Bearer ${token}` },
    redirect: "follow",
    next: {
      revalidate: 0,
    },
  };
  const response = await fetch(
    "https://analytics.xyspg.moe/api/websites/2d67dea1-d9b6-46a6-bcde-02f612591fdf/active",
    requestOptions
  );
  const data = await response.json();
  const activeUsers = data[0].x;
  return activeUsers;
};

const Footer = async () => {
  const activeUsers = await getActiveUsers();

  return (
    <div className="text-xs text-neutral-600">
      <hr className="py-1 my-2" />
      {/*<p>Current Visitors: {activeUsers === 0 ? 1 : activeUsers}</p>*/}
      <p>
        The information in this website may be subject to change due to various
        circumstances. Dalton Academy reserves the right of final interpretation
        of this guide.
      </p>
      <p>
        If you find information missing or mismatch with official document,
        please contact{" "}
        <a
          href="mailto:support@bdfz.app"
          className="text-indigo-700 cursor-pointer"
          data-umami-event="click_footer_email"
        >
          support@bdfz.app
        </a>{" "}
      </p>
      <div className='flex flex-row gap-4'>
        <Link href='/studio'>
            <p className="underline">Studio</p>
        </Link>
        <a
          href="https://github.com/xyspg/dalton-course"
          className="underline"
          rel="noopener"
          target="_blank"
          data-umami-event="click_footer_github"
        >
          Star on GitHub 🌟
        </a>
      </div>
    </div>
  );
};

export default Footer;
