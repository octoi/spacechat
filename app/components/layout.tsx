import React from 'react';
import { ReactComponent } from '@/lib/types';
import Head from 'next/head';
import { AuthWrap } from './auth-wrap';

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
        <title>{title}</title>
        <link rel='icon' href={image} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:type' content='website' />
      </Head>

      <AuthWrap>{children}</AuthWrap>
    </>
  );
};
