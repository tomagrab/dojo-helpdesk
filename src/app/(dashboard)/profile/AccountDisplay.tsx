'use client';
import { Badge } from '@/components/ui/badge';
import { Profile } from '@/lib/Types/Profile/Profile';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';
import AccountForm from './AccountForm';
import AccountCard from './AccountCard';

type AccountDisplayProps = {
  user: User | null;
  profile: Profile | null;
};

export default function AccountDisplay({ user, profile }: AccountDisplayProps) {
  const [editMode, setEditMode] = useState(false);
  return (
    <main>
      <div>
        <Badge
          className={`pill cursor-pointer transition-colors duration-300 hover:bg-yellow-500 ${editMode ? 'bg-yellow-500' : 'bg-blue-500'} `}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </Badge>

        {editMode ? (
          <AccountForm
            user={user}
            profile={profile}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          <AccountCard user={user} profile={profile} />
        )}
      </div>
    </main>
  );
}
