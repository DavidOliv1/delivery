import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

type TParams = {
  placeId?: string;
};

export async function POST(request: Request, { params }: { params: TParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { placeId } = params;

  if (!placeId || typeof placeId !== 'string') {
    throw new Error('Invalid id');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(placeId);

  const user = await prisma?.user?.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: TParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { placeId } = params;

  if (!placeId || typeof placeId !== 'string') {
    throw new Error('Invalid id');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== placeId);

  const user = await prisma?.user?.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
