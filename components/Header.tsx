import Link from "next/link";
const Header = () => {
  return (
    <Link href="/">
      <h1 className="pl-1 text-4xl my-4 font-bold text-neutral-700 cursor-pointer">
        Dalton Courses
      </h1>
    </Link>
  );
};

export default Header;
