'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingPage = () => {
  const cssOverride = {
    display: 'block',
    margin: '100px auto',
  };

  return (
    <ClipLoader
      color={'#3b82f6'}
      cssOverride={cssOverride}
      size={150}
      ariaLabel='Loading Spinner'
    />
  );
};

export default LoadingPage;
