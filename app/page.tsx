import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getPlaces from './actions/getPlaces';
import PlaceCard from './components/places/PlaceCard';
import getCurrentUser from './actions/getCurrentUser';

export default async function Home() {
  const places = await getPlaces();
  const currentUser = await getCurrentUser();

  if (places.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {places.map((place) => (
          <PlaceCard user={currentUser} key={place.id} data={place} />
        ))}
      </div>
    </Container>
  );
}
