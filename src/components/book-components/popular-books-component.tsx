'use client';

import React from 'react';
import { Box, Flex, Image, Text, Badge } from '@chakra-ui/react';

interface IBook {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  ratingCount: number;
  totalRating: number;
}

interface PopularBooksProps {
  books: IBook[];
}

const PopularBooks: React.FC<PopularBooksProps> = ({ books }) => {
  return (
    <Flex justifyContent="space-between" gap={6}>
      {books.map((book, index) => (
        <Box key={book.id} position="relative" width="30%">
          <Image src={book.coverImageUrl} alt={book.title} objectFit="cover" width="100%" height="400px" borderRadius="lg" />
          {index === 0 && (
            <Badge position="absolute" top={4} left={4} colorScheme="orange" fontSize="lg" px={3} py={1} borderRadius="full">
              1
            </Badge>
          )}
          <Box mt={4}>
            <Text fontSize="xl" fontWeight="bold">{book.title}</Text>
            <Text fontSize="md" color="gray.600">{book.author}</Text>
            <Flex alignItems="center" mt={2}>
              <Text color="teal.500" fontWeight="bold" mr={1}>
                {book.ratingCount}
              </Text>
              <Text color="gray.400">/ {book.totalRating}</Text>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default PopularBooks;
