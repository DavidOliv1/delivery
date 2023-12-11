import prisma from '../libs/prismadb';

export default async function getPlaceById(placeId: string) {
  try {
    const place = await prisma.place?.findUnique({
      where: {
        id: placeId,
      },
      include: {
        user: true,
      },
    });

    if (!place) {
      return null;
    }

    return place;
  } catch (error: any) {
    throw new Error(error);
  }
}
