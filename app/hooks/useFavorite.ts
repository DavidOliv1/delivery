import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import useLoginModal from './useLoginModal';

type TUseFavorite = {
  placeId: string;
  user?: User | null;
};

const useFavorite = ({ placeId, user }: TUseFavorite) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(placeId);
  }, [user, placeId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!user) {
        return onOpen();
      }

      try {
        let request;

        if (!hasFavorited) {
          request = () => axios.post(`/api/favorites/${placeId}`);
        } else {
          request = () => axios.delete(`/api/favorites/${placeId}`);
        }

        await request();
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    [onOpen, user, hasFavorited, placeId, router],
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
