import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  if(!currentUser) {
    return NextResponse.error();
  }

  const { category, imageSrc, name, description } = body;

  const place = await prisma?.place.create({
    data: {
      category,
      imageSrc,
      name,
      description,
      userId: currentUser?.id as string
    }
  })

  return NextResponse.json(place);
}