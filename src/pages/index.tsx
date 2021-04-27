import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import API from 'src/libs/API';
import LoginForm from 'src/components/LoginForm';

export default function Home() {
  const firstUpdate = useRef(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect((): void => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      API.health(setIsLoading).then(() => setIsLoading(false));
    }
  });
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && <LoginForm />}
    </>
  );
}
