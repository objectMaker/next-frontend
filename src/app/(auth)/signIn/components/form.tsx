'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import fetchWithUrl from '@/lib/fetchWithUrl';
import Link from 'next/link';

// type Props = {
//   close: () => void;
// };

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export default function SignInForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await fetchWithUrl('/signIn', {
        method: 'POST',
        cache: 'default',
        credentials: 'include',
        body: JSON.stringify({
          username: data.username,
          password: data.password,
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
      <div className="flex items-center justify-center font-bold">
        {'Hi bro,Meet you again '}
      </div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
            e.preventDefault();
          }}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username:</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password:</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
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
