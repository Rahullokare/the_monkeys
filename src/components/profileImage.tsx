import React from 'react';

import Image from 'next/image';

import useProfileImage from '@/hooks/profile/useProfileImage';
import { twMerge } from 'tailwind-merge';

export const DefaultProfile = () => {
  return (
    <Image
      src='/default-profile.svg'
      alt='User not found'
      height={100}
      width={100}
      className='w-full h-full object-cover'
    />
  );
};

export const ProfileFrame = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        className,
        'bg-background-light dark:bg-background-dark ring-1 ring-border-light/25 dark:ring-border-dark/25 flex items-center justify-center overflow-hidden rounded-full'
      )}
    >
      {children}
    </div>
  );
};

export const ProfileImage = ({ username }: { username?: string }) => {
  const { imageUrl, isLoading, isError } = useProfileImage(username);

  if (isLoading)
    return (
      <Image
        src='/default-profile.svg'
        alt={`Profile: ${username}`}
        title={`Profile: ${username}`}
        width={32}
        height={32}
        className='w-full h-full object-cover'
      />
    );

  if (isError)
    return (
      <Image
        src='/default-profile.svg'
        alt={`Profile: ${username}`}
        title={`Profile: ${username}`}
        width={32}
        height={32}
        className='w-full h-full object-cover'
      />
    );

  return (
    <Image
      src={imageUrl}
      alt={`Profile: ${username}`}
      title={`Profile: ${username}`}
      width={32}
      height={32}
      className='w-full h-full object-cover'
    />
  );
};

export default ProfileImage;
