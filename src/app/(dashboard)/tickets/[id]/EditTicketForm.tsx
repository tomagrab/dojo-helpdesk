'use client';
import { updateTicket } from '@/app/(dashboard)/tickets/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(100, {
      message: 'Title must be less than 100 characters long',
    }),
  body: z
    .string()
    .min(10, {
      message: 'Body must be at least 10 characters long',
    })
    .max(1000, {
      message: 'Body must be less than 1000 characters long',
    }),
  priority: z.enum(['low', 'medium', 'high']),
  user_email: z.string(),
});

type EditTicketFormProps = {
  id: string;
  title: string;
  body: string;
  priority: 'low' | 'medium' | 'high';
  user_email: string;
};

export default function EditTicketForm({
  id,
  title,
  body,
  priority,
  user_email,
}: EditTicketFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id.toString(),
      title: title,
      body: body,
      priority: priority,
      user_email: user_email,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await updateTicket(values);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => {
            return (
              <FormItem className="hidden">
                <FormLabel>
                  <Label>ID</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Label>Title</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Label>Body</Label>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Label>Priority</Label>
                </FormLabel>
                <Select onValueChange={field.onChange} disabled={loading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="user_email"
          render={({ field }) => {
            return (
              <FormItem className="hidden">
                <FormLabel>
                  <Label>User Email</Label>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">
          {loading ? 'Updating...' : 'Update Ticket'}
        </Button>
      </form>
    </Form>
  );
}
