import prisma from "@/app/libs/prismadb";

export default async function getPlaces() {
  try {
    const places = await prisma?.place?.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });

    return places;
  } catch (error: any) {
    throw new Error(error);
  }
}
