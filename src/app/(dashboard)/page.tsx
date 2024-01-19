import DashboardPost from '@/components/Layout/Dashboard/DashboardPost/DashboardPost';
import YouTubeIFrame from '@/components/Layout/Dashboard/DashboardPost/YouTubeIFrame';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h2>Dashboard</h2>
      <p>
        The main dashboard of <span className="font-bold">Dojo Helpdesk</span>
      </p>

      <DashboardPost title="Ticketing Updates">
        <p>
          Ticketing has been updated to allow for filtering by ticket number,
          title, priority, and creator.
        </p>
        <br />
        <p>
          The table has also been updated to include pagination, and the ability
          to sort by column.
        </p>
      </DashboardPost>

      <DashboardPost title="Welcome to Dojo Helpdesk">
        <p>Dojo Helpdesk has been completed! (kind of)</p>
        <br />
        <p>
          This site is still being actively worked on and regularly updated.
        </p>
        <br />
        <p>
          Thanks to {``}
          <Badge
            className={`bg-blue-500 transition-colors duration-300 hover:bg-blue-400`}
          >
            <Link href={`https://netninja.dev/courses/`} target="_blank">
              Net Ninja
            </Link>
          </Badge>
          &apos;s{' '}
          <Badge
            className={`bg-blue-500 transition-colors duration-300 hover:bg-blue-400`}
          >
            <Link
              href={`https://netninja.dev/p/next-13-masterclass`}
              target="_blank"
            >
              Next.js 13 Masterclass
            </Link>
          </Badge>
          , I&apos;ve been able to create this site.
        </p>
        <br />
        <p>
          The site also utilizes{' '}
          <Badge
            className={`bg-blue-500 transition-colors duration-300 hover:bg-blue-400`}
          >
            <Link href={`https://ui.shadcn.com/docs`} target="_blank">
              shadcn/ui
            </Link>{' '}
          </Badge>{' '}
          for styling, which I learned how to use courtesy of the{' '}
          <Badge
            className={`bg-blue-500 transition-colors duration-300 hover:bg-blue-400`}
          >
            <Link href={`https://www.youtube.com/@NetNinja`} target="_blank">
              Net Ninja YouTube channel
            </Link>
          </Badge>
        </p>
        <Separator className="my-4" />
        {/* To Do: Fix iFrame placement & size */}
        <YouTubeIFrame
          src={`https://www.youtube-nocookie.com/embed/videoseries?si=G7c5-18GugsMKtPf&amp;list=PL4cUxeGkcC9h1NXLUuiAQ7c4UtdEInqma`}
        />
      </DashboardPost>
    </main>
  );
}
