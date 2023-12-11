import getPlaceById from '@/app/actions/getPlaceById';
import EmptyState from '@/app/components/EmptyState';

type TParams = {
  placeId: string;
};

const PlacePage = async ({ params }: { params: TParams }) => {
  const { placeId } = params;
  const place = await getPlaceById(placeId);

  if (!place) {
    return <EmptyState />;
  }

  return <div>{place?.name}</div>;
};

export default PlacePage;
