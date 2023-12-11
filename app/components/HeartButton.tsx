'use client';

import { User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { cn } from '../utils/cn';
import useFavorite from '../hooks/useFavorite';

type HeartButtonProps = {
  placeId: string;
  user?: User | null;
};

const HeartButton = ({ placeId, user }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ placeId, user });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={cn('fill-neutral-500/70', {
          'fill-rose-500': hasFavorited,
        })}
      />
    </div>
  );
};

export default HeartButton;
