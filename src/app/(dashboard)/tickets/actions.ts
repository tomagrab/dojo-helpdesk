"use server";

import { FormTicket } from "@/lib/Types/FormTicket/FormTicket";
import { Ticket } from "@/lib/Types/Ticket/Ticket";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addTicket(ticket: FormTicket) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Insert the data
  const { error } = await supabase.from("Tickets").insert({
    ...ticket,
    user_email: session?.user?.email,
  });

  if (error) {
    throw new Error("Ticket could not be added");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function updateTicket(ticket: Ticket) {
  console.log("updateTicket");
  console.log(ticket);
  const supabase = createServerActionClient({ cookies });

  // Insert the data
  const { error } = await supabase
    .from("Tickets")
    .update(ticket)
    .eq("id", ticket.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id: string) {
  const supabase = createServerActionClient({ cookies });

  // Insert the data
  const { error } = await supabase.from("Tickets").delete().eq("id", id);

  if (error) {
    throw new Error("Ticket could not be deleted");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
