'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { unstable_noStore as noStore } from 'next/cache';
import { useRouter, useSearchParams } from 'next/navigation';

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
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import request from '@/request';
import { useEffect, useState } from 'react';
import { md5Hash } from '@/lib/utils';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export default function SignInForm() {
  noStore();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get('redirect');

  useEffect(() => {
    if (redirectUrl) {
      toast({
        variant: 'destructive',
        title: 'warning',
        description: `your token expired need to login`,
      });
      console.log('我也是尽力了');
    }
  }, [redirectUrl, toast]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      await request('/signIn', {
        method: 'POST',
        cache: 'default',
        credentials: 'include',
        data: {
          ...data,
          password: md5Hash(data.password),
        },
      });
      toast({
        variant: 'default',
        title: 'congratulation',
        description: `you are sign in!${data.username}`,
      });
      router.push('/');
    } finally {
      setLoading(false);
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
          <Button disabled={loading} type="submit" className="h-8 w-full">
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
