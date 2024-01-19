import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TicketType } from '@/lib/Types/Ticket/TicketType';

type TicketDialogProps = {
  ticket: TicketType;
  children: React.ReactNode;
};

export function TicketDialog({ children, ticket }: TicketDialogProps) {
  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{ticket.title}</DialogTitle>
        </DialogHeader>
        <div>
          <DialogDescription>{ticket.body}</DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
