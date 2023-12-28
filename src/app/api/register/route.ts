import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(3),
  passwordConfirm: z.string()
});

export async function POST(req: Request) {
  const body = await req.json();

  const { emailAddress, password } = body;

  // const exist = await prisma.user.findFirst({
  //   where: {
  //     email: emailAddress
  //   }
  // });

  // if (exist) {
  //   return new NextResponse("user already exist", { status: 400 });
  // }

  // const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: emailAddress,
      hashedPassword: password
    }
  });

  return NextResponse.json(user);
}
