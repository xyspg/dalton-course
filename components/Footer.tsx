import React from "react";

const Footer = () => {
  return (
    <div className='text-xs text-neutral-600 bg-neutral-50'>
        <hr className='my-1 mb-2' />
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
        >
          support@bdfz.app
        </a>{" "}
      </p>
    </div>
  );
};

export default Footer;
