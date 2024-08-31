'use client';

import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Image from 'next/image';

interface IBook {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  ratingCount: number;
  totalRating: number;
}

interface BookGridProps {
  books: IBook[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  const cardBgColor = useColorModeValue('white', 'gray.600');

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {books.map((book) => (
        <Box key={book.id} bg={cardBgColor} borderRadius="lg" overflow="hidden" boxShadow="md" pt={10}>
          <Box position="relative" h={64}>
            <Image src={book.coverImageUrl} alt={book.title} layout="fill" objectFit="cover"/>
          </Box>
          <Box p={4}>
            <Heading as="h3" size="md" mb={1}>
              {book.title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {book.author}
            </Text>
            <Flex justify="space-between" align="center">
              <Flex align="center">
                <Text color="teal.500" fontWeight="bold" mr={1}>
                  {book.ratingCount}
                </Text>
                <Text color="gray.400">/ {book.totalRating}</Text>
              </Flex>
              <IconButton
                aria-label="Edit book"
                icon={<EditIcon />}
                size="sm"
                variant="ghost"
              />
            </Flex>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default BookGrid;