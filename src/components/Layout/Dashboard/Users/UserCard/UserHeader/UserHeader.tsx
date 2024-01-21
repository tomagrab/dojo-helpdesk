import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Profile } from '@/lib/Types/Profile/Profile';
import { User } from '@supabase/supabase-js';

type UserHeaderProps = {
  user: User;
  profile: Profile;
};

export default function UserHeader({ user, profile }: UserHeaderProps) {
  return (
    <>
      <Avatar>
        {profile?.avatar_url ? (
          <AvatarImage src={profile?.avatar_url} />
        ) : (
          <AvatarImage src={`/Images/ninja.png`} />
        )}
        <AvatarFallback>{user.email?.charAt(0)}</AvatarFallback>
      </Avatar>
      {profile?.username ? (
        <h2>{profile.username}</h2>
      ) : profile?.full_name ? (
        <h2>{profile.full_name}</h2>
      ) : (
        <h2>{user.email}</h2>
      )}
    </>
  );
}
