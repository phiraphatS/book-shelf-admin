'use client';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useColorModeValue,
  IconButton,
  keyframes,
} from '@chakra-ui/react';
import { SearchIcon, BellIcon, ShoppingCartIcon, BookOpenIcon } from 'lucide-react';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const AnimatedBook = ({ top, left, delay, rotate }: any) => (
  <Box
    position="absolute"
    top={top}
    left={left}
    transform={`rotate(${rotate}deg)`}
    animation={`${float} 6s ease-in-out infinite`}
    transitionDelay={delay}
  >
    <BookOpenIcon size={48} color="rgba(255,255,255,0.1)" />
  </Box>
);

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [books, setBooks] = useState<{ top: string, left: string, delay: string, rotate: number}[]>([]);

  const bgColor = 'teal.900';
  const boxBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  useEffect(() => {
    const generateBooks = () => {
      const newBooks = [];
      for (let i = 0; i < 10; i++) {
        newBooks.push({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 5}s`,
          rotate: Math.random() * 360
        });
      }
      setBooks(newBooks);
    };
    generateBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });
    
    if (result?.ok) {
      router.push('/book');
    } else {
      setError('Invalid username or password');
    }
    setIsLoading(false);
  };

  return (
    <Box bg={bgColor} minH="100vh" position="relative" overflow="hidden">
      {books.map((book, index) => (
        <AnimatedBook key={index} {...book} />
      ))}
      <Container maxW="container.xl" py={4} height="100vh" display="flex" flexDirection="column">
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Heading color="white" size="lg">BookStore</Heading>
          <Flex>
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              variant="ghost"
              color="white"
              mr={2}
            />
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              color="white"
              mr={2}
            />
            <IconButton
              aria-label="Cart"
              icon={<ShoppingCartIcon />}
              variant="ghost"
              color="white"
            />
          </Flex>
        </Flex>
        <Flex flex={1} direction="column" alignItems="center" justifyContent="center">
          <Box
            bg={boxBgColor}
            p={8}
            rounded="lg"
            shadow="2xl"
            w={{ base: "90%", md: "400px" }}
            position="relative"
            zIndex={1}
          >
            <VStack spacing={6} align="stretch">
              <Heading as="h1" size="xl" textAlign="center" color={textColor}>
                Sign In
              </Heading>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel color={textColor}>Username</FormLabel>
                    <Input
                      name="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      placeholder="Enter your username"
                      bg="gray.100"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color={textColor}>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      placeholder="Enter your password"
                      bg="gray.100"
                    />
                  </FormControl>
                  {error && (
                    <Text color="red.500" fontSize="sm">
                      {error}
                    </Text>
                  )}
                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    width="full"
                    isLoading={isLoading}
                    loadingText="Signing In"
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}