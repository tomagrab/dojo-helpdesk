'use client';

import { Ticket } from '@/lib/Types/Ticket/Ticket';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';
import EditTicketForm from './EditTicketForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type TicketDisplayProps = {
  ticket: Ticket;
  user: User;
};

export default function TicketDisplay({ ticket, user }: TicketDisplayProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {(user?.email === ticket.user_email && editMode) ||
      (user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && editMode) ? (
        <EditTicketForm
          id={ticket.id}
          title={ticket.title}
          body={ticket.body}
          priority={ticket.priority}
          user_email={ticket.user_email}
        />
      ) : (
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="">{ticket.title}</CardTitle>
            <div className="flex items-center gap-2">
              {user?.email === ticket.user_email ||
              user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
                <Badge
                  className="pill bg-blue-500"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent>
            <p>{ticket.body}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge>{ticket.user_email}</Badge>
            <Badge className={`pill ${ticket.priority}`}>
              {ticket.priority}
            </Badge>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
