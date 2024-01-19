"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/lib/Types/Database/Database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  full_name: z
    .string()
    .min(3, {
      message: "Full name must be at least 3 characters long",
    })
    .max(100, {
      message: "Full name must be less than 100 characters long",
    }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(100, {
      message: "Username must be less than 100 characters long",
    }),
  website: z.string().max(1000, {
    message: "Website must be less than 1000 characters long",
  }),
  avatar_url: z.string(),
});

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [full_name, setfull_name] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setfull_name(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("There was a major error!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: string | null;
    full_name: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      console.log("updateProfile", {
        id: user?.id as string,
        full_name,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateProfile = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await updateProfile(values);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: full_name ?? "",
      username: username ?? "",
      website: website ?? "",
      avatar_url: avatar_url ?? "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateProfile)}>
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
