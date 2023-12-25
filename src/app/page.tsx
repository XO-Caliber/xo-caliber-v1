import { Button } from '@/components/ui/Button';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <Button variant={'primary'}>Click Me</Button>
    </div>
  );
}
