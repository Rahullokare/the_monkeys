import Link from 'next/link';

import HomeBanner from '@/components/branding/HomeBanner';
import { LinksSection } from '@/components/branding/LinksSection';
import { AI } from '@/components/branding/featuresGrid/AI';
import { CollaborativeBlogging } from '@/components/branding/featuresGrid/CollaborativeBlogging';
import { DiverseTopics } from '@/components/branding/featuresGrid/DiscoverDiversity';
import { RespectfulEnv } from '@/components/branding/featuresGrid/RespectfulEnv';
import { VersionControl } from '@/components/branding/featuresGrid/VersionControl';
import Icon from '@/components/icon';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <Container className='min-h-screen space-y-8 sm:space-y-10'>
      <HomeBanner />

      <h2 className='mx-auto w-fit pt-8 px-4 font-dm_sans text-lg sm:text-xl md:text-2xl text-center leading-7'>
        With Monkeys,{' '}
        <span className='px-1 bg-brand-orange/25'>create content</span> ✍ that
        truly makes a difference.
      </h2>

      <LinksSection />

      <h2 className='mx-auto w-full sm:w-4/5 pt-[150px] sm:pt[200px] px-4 font-arvo text-2xl sm:text-3xl md:text-4xl text-center'>
        We are built to empower creativity, collaboration, and meaningful
        storytelling.
      </h2>

      <div className='bg-gradient-to-t from-brand-orange from-[15%] px-4 py-[80px]'>
        <div className='grid grid-cols-3 gap-2 sm:gap-4 mx-auto max-w-5xl'>
          <CollaborativeBlogging />

          <DiverseTopics />

          <AI />

          <VersionControl />

          <RespectfulEnv />
        </div>
      </div>

      <div className='py-[80px] sm:py-[100px] px-4 flex flex-col items-center gap-4'>
        <p className='font-dm_sans text-base sm:text-lg md:text-xl text-center'>
          Start your blogging journey today—collaborate, create, and share
          without limits!
        </p>

        <Button size='lg' className='group px-6 rounded-full shadow-md' asChild>
          <Link href='/create' title='Create'>
            <div>
              <Icon
                name='RiPencil'
                className='mr-2 group-hover:animate-icon-shake'
              />
            </div>
            <p className='font-dm_sans'>Start Writing</p>
          </Link>
        </Button>
      </div>
    </Container>
  );
};

export default LandingPage;
