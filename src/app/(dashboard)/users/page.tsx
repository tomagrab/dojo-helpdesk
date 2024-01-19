import UserCard from "@/components/Layout/Dashboard/Users/UserCard/UserCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUsers = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error(error);
    redirect("/");
  }

  return users;
};

const getUserTickets = async (user_email: string) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("user_email", user_email);

  if (error) {
    console.error(error);
    redirect("/");
  }

  return data;
};

export default async function Users() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  const user = data?.session?.user;

  if (error) {
    console.error(error);
    redirect("/");
  }

  if (!user) {
    redirect("/login");
  }
  /* 
  if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/');
  }
 */
  // Get all users
  const users = await getUsers();

  let userTickets = [];

  // Get tickets for each user
  for (const user of users) {
    const tickets = await getUserTickets(user.email!);
    userTickets.push(tickets);
  }

  console.log(userTickets);

  return (
    <div>
      <h1>Users</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
