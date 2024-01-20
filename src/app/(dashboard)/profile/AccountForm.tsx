'use client';
import { useState } from 'react';
import { Database } from '@/lib/Types/Database/Database.types';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Profile } from '@/lib/Types/Profile/Profile';
import { updateProfile } from './actions';

const formSchema = z.object({
  full_name: z
    .string()
    .min(3, {
      message: 'Full name must be at least 3 characters long',
    })
    .max(100, {
      message: 'Full name must be less than 100 characters long',
    }),
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters long',
    })
    .max(100, {
      message: 'Username must be less than 100 characters long',
    }),
  website: z.string().max(1000, {
    message: 'Website must be less than 1000 characters long',
  }),
  avatar_url: z.string(),
});

type AccountFormProps = {
  user: User | null;
  profile: Profile | null;
  editMode: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountForm({
  user,
  profile,
  editMode,
  setEditMode,
}: AccountFormProps) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: profile?.full_name ?? '',
      username: profile?.username ?? '',
      website: profile?.website ?? '',
      avatar_url: profile?.avatar_url ?? '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await updateProfile(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setEditMode!(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Label>Full Name</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Label>Username</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Label>Website</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Label>Avatar URL</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </form>
    </Form>
  );
}
