import Link from "next/link";

export default function Header() {
  return (
    <div className="mb-9 flex items-center justify-between py-4 px-16">
      <Link href={"/"}>
        <p className="text-3xl font-semibold">
          Work<span className="text-primary">Mate</span>
        </p>
      </Link>
      <ul className="flex items-center space-x-10 text-base font-semibold">
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
          className="rounded-md bg-primary py-1 px-3.5"
        >
          Logout
        </button>
      </ul>
    </div>
  );
}
