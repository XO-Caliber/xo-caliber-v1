import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";

export function PaymentCard() {
  return (
    <Card className="relative z-50 w-[350px]">
      <CardHeader>
        <CardTitle>Individual user</CardTitle>
        <CardDescription>
          All the features including creating an dediting questions and cover letter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="my-4 text-xl font-semibold">
          <span className="text-[50px] font-bold">$500</span>/mo
        </p>
      </CardContent>
      <CardFooter className="w-full">
        <Button variant={"dark"} className="w-full">
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
