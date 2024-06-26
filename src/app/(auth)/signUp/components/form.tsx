'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { unstable_noStore as noStore } from 'next/cache';
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
import { useToast } from '@/components/ui/use-toast';
import request from '@/request';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { md5Hash } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
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

      await request.post('/createUser', {
        credentials: 'include',
        data: {
          username: data.username,
          password: md5Hash(data.password),
        },
      });
      toast({
        variant: 'default',
        title: 'congratulation',
        description: `you are create a new user,${data.username} !`,
      });
      router.push('/signIn');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center font-bold">
        {'Hi bro,Welcome to register'}
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirmPassword:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirmPassword"
                    type="password"
                    {...field}
                  />
                </FormControl>
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
