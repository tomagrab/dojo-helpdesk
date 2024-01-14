import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h2>Dashboard</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dicta eos
        ut nostrum eligendi libero reprehenderit harum, quis cum ex voluptatum
        est tempore doloribus maxime autem totam dignissimos expedita omnis
        reiciendis? Sit eaque voluptatum, iure possimus minus cum et labore
        molestiae quidem, fugiat deserunt porro officiis rem, incidunt obcaecati
        voluptatem?
      </p>

      <div className="my-8 flex justify-center">
        <Link href="/tickets">
          <button className="btn-primary">View Tickets</button>
        </Link>
      </div>

      <h2>Company Updates</h2>

      <Card className="my-4">
        <CardHeader>
          <CardTitle>New member of the web dev team...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dicta
            eos ut nostrum eligendi libero reprehenderit harum, quis cum ex
            voluptatum est tempore doloribus maxime autem totam dignissimos
            expedita omnis reiciendis? Sit eaque voluptatum, iure possimus minus
            cum et labore molestiae quidem, fugiat deserunt porro officiis rem,
            incidunt obcaecati voluptatem?
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New website live</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dicta
            eos ut nostrum eligendi libero reprehenderit harum, quis cum ex
            voluptatum est tempore doloribus maxime autem totam dignissimos
            expedita omnis reiciendis? Sit eaque voluptatum, iure possimus minus
            cum et labore molestiae quidem, fugiat deserunt porro officiis rem,
            incidunt obcaecati voluptatem?
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
