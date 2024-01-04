import Link from "next/link";
import DaltonLogo from "@/public/img/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <Link href="/" className="mt-4 md:mt-0 flex flex-row gap-1 items-center mb-4">
      <Image src={DaltonLogo} alt="dalton logo" height={80} width={80}/>
      <span className="flex flex-col">
        <h1 className="pl-1 text-md font-medium text-red-900 cursor-pointer font-sans ">
          The Affiliated High School of Peking <br className='hidden md:block' />
          University&apos;s Dalton Academy Course List
        </h1>
      </span>
    </Link>
  );
};

export default Header;
