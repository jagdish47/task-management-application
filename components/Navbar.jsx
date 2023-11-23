import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-900 text-white">
      <Link className="font-bold" href={"/"}>
        HOME
      </Link>
      <Link
        className="border py-1 px-2 bg-white text-black font-semibold border-none"
        href={"/addTopic"}
      >
        Add Topic
      </Link>
    </div>
  );
};

export default Navbar;
