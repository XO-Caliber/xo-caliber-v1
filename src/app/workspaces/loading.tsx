import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <Loader2 size={100} className="absolute animate-spin place-items-center" />;
}
