import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Button variant={'primary'}>Click Me</Button>
      <Button variant={'destructive'}>Click Me</Button>
      <Button variant={'ghost'}>Click Me</Button>
      <Button variant={'link'}>Click Me</Button>
      <Button variant={'outline'}>Click Me</Button>
      <Button variant={'secondary'}>Click Me</Button>
      <Button variant={'dark'}>Click Me</Button>
    </main>
  );
}
