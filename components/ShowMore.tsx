'use client';

import { ShowMoreProps } from '@/types';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';
import { updateSearchParams } from '@/utils';

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
        const newPathname = updateSearchParams('limit', `${newLimit}`);

        router.push(newPathname, {scroll:false})
  };

  return (
    <div className="flex justify-center items-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          handleClick={handleNavigation}
          containerStyles="bg-primary-blue rounded-full text-white"
        />
      )}
    </div>
  );
};

export default ShowMore;
