'use client';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import PubSub from 'pubsub-js';
import { ToastAction } from '@/components/ui/toast';

export default function ErrorToast() {
  const { toast } = useToast();
  useEffect(() => {
    PubSub.subscribe('showError', function (messageType: string, data: string) {
      toast({
        variant: 'destructive',
        title: 'error',
        description: data,
        action: <ToastAction altText="Try again">confirm</ToastAction>,
      });
    });
    return () => {
      PubSub.unsubscribe('showError');
    };
  }, [toast]);
  return <></>;
}
