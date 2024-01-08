import Link from "next/link.js";
import { useRouter } from "next/navigation.js";

export default function Logout() {
  const router = useRouter();

  async function handleClick() {
    console.log("Logout component rendered");
    await fetch("/api/users/logout", {
      method: "POST",
    });
    router.refresh();
  }

  return (
    <Link style={{ textDecoration: "none" }} onClick={handleClick} href={"/"}>
      Logout
    </Link>
  );
}
