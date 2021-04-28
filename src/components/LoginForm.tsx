import React, { useState } from 'react';
import {
  Alert,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import API from 'src/libs/API';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await API.login({ email, password });
    try {
      setIsLoggedIn(true);
      setIsLoading(false);
      setShowPassword(false);
    } catch (ex) {
      setError('Invalid username or password');
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setShowPassword(false);
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} width="50%" borderWidth={1} borderRadius={8} boxShadow="lg">
        {isLoggedIn ? (
          <Box textAlign="center">
            <Text>
              {email}
              {' '}
              logged in!
            </Text>
            <Button
              variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => setIsLoggedIn(false)}
            >
              Sign out
            </Button>
          </Box>
        ) : (
          <Flex direction="column">
            <Box textAlign="center">
              <Heading>Welcome !</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <Alert status="error" message={error} />}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="email@email.com"
                    size="lg"
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*******"
                      size="lg"
                      onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    <InputRightElement width="3rem">
                      <Button h="1.5rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Icon name="view-off" /> : <Icon name="view" />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button variantColor="teal" variant="outline" type="submit" width="full" mt={4}>
                  {isLoading ? (
                    <CircularProgress isIndeterminate size="24px" color="teal" />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
