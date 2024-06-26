'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import fetchWithUrl from '@/lib/fetchWithUrl';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';

// type Props = {
//   close: () => void;
// };

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export default function SignInForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await fetchWithUrl('/createUser', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          username: data.username,
        }),
      });
      toast({
        variant: 'default',
        title: 'congratulation',
        description: 'you are create a new user !',
        action: <ToastAction altText="Try again">{data.username}</ToastAction>,
      });
      //   props.close();
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again"></ToastAction>,
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
            e.preventDefault();
          }}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-8 w-full">
            SIGN IN
          </Button>
        </form>
      </Form>
      <div className="flex flex-row items-center justify-between px-2 text-sm">
        <div>{"Don't have an account?"}</div>
        <Link href="/signUp">
          <Button variant="link">signUp</Button>
        </Link>
      </div>
    </>
  );
}
