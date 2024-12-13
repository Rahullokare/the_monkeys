import Icon from '@/components/icon';

export const DiverseTopics = () => {
  return (
    <div className='group p-4 md:p-6 col-span-3 sm:col-span-2 md:col-span-1 flex flex-col justify-between gap-4 bg-background-light dark:bg-background-dark border-1 border-foreground-light dark:border-foreground-dark rounded-xl overflow-hidden'>
      <Icon name='RiCompass' size={24} className='opacity-80' />

      <div className='space-y-1'>
        <h2 className='font-dm_sans font-medium text-base sm:text-lg md:text-xl'>
          Diverse Topics
        </h2>

        <p className='font-roboto text-xs sm:text-sm md:text-base opacity-80'>
          Explore diverse categories, from tech and health to travel and
          lifestyle—something for everyone.
        </p>
      </div>
    </div>
  );
};
