'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const formSchema = z.object({
  emailAddress: z.string().email()
});

export const LoginBox = () => {
  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: ''
    }
  });

  const handleSubmit = () => {};

  return (
    <section className='w-96 h-96 bg-background m-2 p-4 rounded-xl'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            handleSubmit
          )}
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={(field) => {
              return (
                <FormItem>
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input placeholder='Email address' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </section>
  );
};
