import Image from "next/image";
import styles from "./page.module.css";
import Home2 from "@/app/home/page";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div>
      <Home2 />
    </div>
  );
}
