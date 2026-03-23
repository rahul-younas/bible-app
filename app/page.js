import { ModeToggle } from "@/components/themeBtn";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar";

export default async function Home() {

  return (
    <> 
      <div className="flex justify-center my-10">

        <Link href={'/bible'}>
          <Button className={'text-2xl'}>Let&apos;s Read</Button>
        </Link>
      </div>
    </>
  );
}
