import Link from "next/link";
import Image from "next/image";

const LogoLink = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl">
      <Image src="/SD1.png" alt="Logo" width={50} height={50} />
      <span className="font-black">
  <span className="text-primary">Scan</span>
  <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
  Dx
</span>
</span>
    </Link>
  );
};

export default LogoLink;
