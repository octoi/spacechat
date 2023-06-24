import React from 'react';
import Head from 'next/head';
import { ReactComponent } from '@/lib/types/react.type';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

export const Layout: ReactComponent<Props> = ({
  children,
  title,
  description,
  image,
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Spacechat'}</title>
        <link rel='icon' href={image || '/icon.ico'} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:type' content='website' />
      </Head>
      <div>{children}</div>
    </>
  );
};
