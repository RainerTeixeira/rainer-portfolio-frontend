/**
 * Testes para componente Form
 */

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

function TestForm() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormDescription>Enter your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

describe('Form', () => {
  it('deve renderizar o formulário', () => {
    render(<TestForm />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('deve exibir label do campo', () => {
    render(<TestForm />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('deve exibir descrição do campo', () => {
    render(<TestForm />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });
});
