import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DashboardPostProps = {
  title: string;
  children?: React.ReactNode;
};

export default function DashboardPost({ title, children }: DashboardPostProps) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
