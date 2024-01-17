import DashboardPost from "@/components/Layout/Dashboard/DashboardPost/DashboardPost";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>Dashboard</h2>
      <p>
        The main dashboard of <span className="font-bold">Dojo Helpdesk</span>
      </p>

      <h2>Site Updates</h2>

      <DashboardPost title="Welcome to Dojo Helpdesk">
        Dojo Helpdesk has been completed!
        <br />
        <br />
        Thanks to {``}
        <Badge>
          <Link href={`https://netninja.dev/courses/`} target="_blank">
            Net Ninja
          </Link>
        </Badge>
        &apos;s{" "}
        <Badge>
          <Link
            href={`https://netninja.dev/p/next-13-masterclass`}
            target="_blank"
          >
            Next.js 13 Masterclass
          </Link>
        </Badge>
        , I&apos;ve been able to create this site.
        <br />
        <br />
        The site also utilizes{" "}
        <Badge>
          <Link href={`https://ui.shadcn.com/docs`} target="_blank">
            shadcn/ui
          </Link>{" "}
        </Badge>{" "}
        for styling, which I learned how to use courtesy of the{" "}
        <Badge>
          <Link href={`https://www.youtube.com/@NetNinja`} target="_blank">
            Net Ninja YouTube channel
          </Link>
        </Badge>
        <Separator className="my-4" />
        {/* To Do: Fix iFrame placement & size */}
        <div className="mt-4 flex flex-col items-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/videoseries?si=G7c5-18GugsMKtPf&amp;list=PL4cUxeGkcC9h1NXLUuiAQ7c4UtdEInqma"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </DashboardPost>
    </main>
  );
}
