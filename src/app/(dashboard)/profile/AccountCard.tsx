import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Profile } from '@/lib/Types/Profile/Profile';
import { Avatar } from '@radix-ui/react-avatar';
import { User } from '@supabase/supabase-js';

type AccountCardProps = {
  user: User | null;
  profile: Profile | null;
};

export default function AccountCard({ user, profile }: AccountCardProps) {
  return (
    <Card className="my-4 ">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Avatar>
              <AvatarImage
                className="h-10 w-10"
                src={profile?.avatar_url ?? ''}
                alt={profile?.username ?? ''}
              />
              <AvatarFallback>{profile?.username?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <h2>
            {profile?.username ?? ''}
            {` `}
            {profile?.full_name ? `(${profile?.full_name})` : null}
          </h2>
        </CardTitle>
        <CardDescription className="flex flex-col items-center gap-2">
          <p>{user?.email}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
