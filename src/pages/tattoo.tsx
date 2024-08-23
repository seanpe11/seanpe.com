import { GetServerSideProps } from 'next';

// @ts-expect-error
export const getServerSideProps: GetServerSideProps = () => {
  return {
    redirect: {
      destination: '/',
      permanent: false, // Set to true if you want a permanent redirect (HTTP 301)
    },
  };
};

export default function TattooPage() {
  return null; // This component will never be rendered because of the redirect
}

