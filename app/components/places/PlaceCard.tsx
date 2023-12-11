'use client';

import { Place, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeartButton from '../HeartButton';

type PlaceCardProps = {
  data: Place;
  user?: User | null; // SafeUser
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};

const PlaceCard = ({
  data,
  user,
  onAction,
  disabled,
  actionLabel,
  actionId,
}: PlaceCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/place/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Place"
            src={data.imageSrc}
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton placeId={data.id} user={user} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.name}</div>
        <div className="font-light text-neutral-500 text-sm">
          {data.category}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
