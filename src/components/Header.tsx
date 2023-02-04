import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between bg-[#004643] py-4 px-16">
      <Link href={"/"}>
        <p className="text-3xl font-semibold text-white">
          Work<span className="text-[#f9bc60]">Mate</span>
        </p>
      </Link>
      <ul className="flex items-center space-x-10 text-base font-semibold text-white">
        <li>
          <Link href={"/"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/projects"}>Projects</Link>
        </li>
        <li>
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </li>
        <button
          onClick={() => null}
          className="rounded-md bg-white py-1 px-3.5 text-black"
        >
          Logout
        </button>
      </ul>
    </div>
  );
}
