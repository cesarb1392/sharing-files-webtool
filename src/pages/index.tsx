import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

export default function Home() {
  const firstUpdate = useRef(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      setIsLoading(true);
      axios.get('http://localhost:3001').then(() => setIsLoading(false));
    }
  });
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && <>Finish Loading</>}
    </>
  );
}
