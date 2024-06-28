'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { unstable_noStore as noStore } from 'next/cache';

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
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import request from '@/request';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'confirmPassword must be equal to password',
    path: ['confirmPassword'],
  });

export default function SignUpForm() {
  noStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      const res = await request.post('/createUser', {
        credentials: 'include',
        body: JSON.stringify({
          username: data.username,
        }),
      });
      console.log(res, 'res++++++');
      toast({
        variant: 'default',
        title: 'congratulation',
        description: 'you are create a new user !',
        action: <ToastAction altText="Try again">{data.username}</ToastAction>,
      });
    } finally {
      setLoading(false);
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
          className="space-y-3"
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormDescription>Please enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirmPassword</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirmPassword"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter your password again
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="h-8 w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            SIGN UP
          </Button>
        </form>
      </Form>
      <div className="flex flex-row items-center justify-between px-2 text-sm">
        <div>Already have an account?</div>
        <Link href="/signIn">
          <Button variant="link">signIn</Button>
        </Link>
      </div>
    </>
  );
}
