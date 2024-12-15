import { BlogActionsDropdown } from '@/components/blog/actions/BlogActionsDropdown';
import { BookmarkButton } from '@/components/blog/buttons/BookmarkButton';
import { LikeButton } from '@/components/blog/buttons/LikeButton';
import { useGetLikesCount } from '@/hooks/user/useLikeStatus';
import { useSession } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

export const BlogReactions = ({
  className,
  blogId,
}: {
  className?: string;
  blogId?: string;
}) => {
  const { status } = useSession();
  const { likes, likeCountLoading, likeCountError } = useGetLikesCount(blogId);

  if (status === 'unauthenticated')
    return (
      <div
        className={twMerge(
          className,
          'flex justify-between items-center gap-3'
        )}
      >
        <p className='font-roboto text-xs sm:text-sm opacity-80 italic'>
          You are not logged in.
        </p>

        <BlogActionsDropdown blogId={blogId} />
      </div>
    );

  return (
    <div
      className={twMerge(className, 'flex justify-between items-center gap-3')}
    >
      <div className='flex items-center gap-1'>
        <div className='flex items-center'>
          <LikeButton
            blogId={blogId}
            // isDisable={data?.user?.account_id === accountId}
          />

          <p className='font-roboto text-xs sm:text-sm opacity-80'>
            {likeCountLoading ? 0 : likeCountError ? 'NA' : likes?.count}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <BookmarkButton
          blogId={blogId}
          // isDisable={data?.user?.account_id === accountId}
        />

        <BlogActionsDropdown blogId={blogId} />
      </div>
    </div>
  );
};
