import React, { FC } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { generateSlug } from '@/app/blog/utils/generateSlug';
import Icon from '@/components/icon';
import { UserInfoCardCompact } from '@/components/user/userInfo';
import { LIVE_URL } from '@/constants/api';
import { BLOG_ROUTE } from '@/constants/routeConstants';
import { Blog } from '@/services/blog/blogTypes';

import { ReactionsInfo } from '../ReactionsInfo';
import { BlogShareDialog } from '../actions/BlogShareDialog';
import { DeleteBlogDialog } from '../actions/DeleteBlogDialog';
import { EditBlogDialog } from '../actions/EditBlogDialog';
import { getCardContent } from '../getBlogContent';

interface BlogCardProps {
  blog: Blog;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  modificationEnable?: boolean;
}

export const BlogCard: FC<BlogCardProps> = ({
  blog,
  status,
  modificationEnable = false,
}) => {
  const router = useRouter();

  const authorId = blog?.owner_account_id;
  const blogId = blog?.blog_id;
  const date = blog?.published_time || blog?.blog?.time;
  const isDraft = blog?.is_draft;

  const { titleDiv, descriptionDiv, imageDiv } = getCardContent({
    blog,
    isDraft,
  });
  // Generate the slug for the blog title
  const blogTitle = blog?.blog?.blocks[0]?.data?.text;
  const blogSlug = generateSlug(blogTitle);
  const handleEdit = (blogId: string) => {
    router.push(`/edit/${blogId}`);
  };

  const showModificationOptions =
    status === 'authenticated' && modificationEnable;

  const likesCount = blog?.LikeCount || blog?.like_count;
  const bookmarksCount = blog?.BookmarkCount || blog?.bookmark_count;

  return (
    <div className='relative w-full md:px-6'>
      <div className='space-y-3'>
        <UserInfoCardCompact id={authorId} date={date} />

        {isDraft ? (
          <div className='group flex flex-col sm:flex-row gap-4'>
            <div className='flex-1 space-y-1 sm:space-y-2'>
              {titleDiv}
              {descriptionDiv}
            </div>

            {imageDiv && (
              <div className='h-[180px] sm:h-[120px] w-full sm:w-[160px] overflow-hidden rounded-md'>
                {imageDiv}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={{
              pathname: `${BLOG_ROUTE}/${blogSlug}-${blogId}`,
            }}
            className='group flex flex-col sm:flex-row gap-4'
          >
            <div className='flex-1 space-y-1 sm:space-y-2'>
              {titleDiv}
              {descriptionDiv}
            </div>

            {imageDiv && (
              <div className='h-[180px] sm:h-[120px] w-full sm:w-[160px] overflow-hidden rounded-md'>
                {imageDiv}
              </div>
            )}
          </Link>
        )}
      </div>

      <div className='mt-3 flex justify-between items-center gap-4'>
        <ReactionsInfo
          likesCount={likesCount}
          bookmarksCount={bookmarksCount}
        />

        <div className='flex items-center gap-1'>
          {showModificationOptions && !isDraft && (
            <EditBlogDialog blogId={blogId} />
          )}

          {showModificationOptions && isDraft && (
            <button
              onClick={() => handleEdit(blogId)}
              className='p-1 flex items-center justify-center cursor-pointer opacity-100 hover:opacity-80'
              title='Edit Draft'
            >
              <Icon name='RiEdit2' size={18} />
            </button>
          )}

          {showModificationOptions && (
            <DeleteBlogDialog blogId={blogId} isDraft={isDraft} />
          )}

          {!isDraft && (
            <BlogShareDialog
              blogURL={`${LIVE_URL}${BLOG_ROUTE}/${blogSlug}-${blogId}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
