import React from 'react';
import { Box, Container, Heading, Flex } from '@chakra-ui/react';
import BookGrid from '@/components/book-components/book-grid-component';
import Pagination from '@/components/book-components/pagination-component';
import PopularBooks from '@/components/book-components/popular-books-component';
import { bookServices } from '@/services/book.services';

interface IBook {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  ratingCount: number;
  totalRating: number;
}

interface BookPageProps {
  searchParams: { start?: string; limit?: string };
}

const BookPage: React.FC<BookPageProps> = async ({ searchParams }) => {
  const start = parseInt(searchParams.start || '0', 10);
  const limit = parseInt(searchParams.limit || '10', 10);
  const currentPage = Math.floor(start / limit) + 1;
  
  let books: IBook[] = [];
  let popularBooks: IBook[] = [];
  let totalBooks = 0;

  try {
    const [fetchBooks, fetchPopularBooks] = await Promise.all([
      bookServices.getBooks(start, limit),
      bookServices.getPopularBooks(3),
    ]);
    
    if (fetchBooks && fetchBooks.status === true) {
      books = fetchBooks.results;
      totalBooks = fetchBooks._meta.total;
    }
    if (fetchPopularBooks && fetchPopularBooks.status === true) {
      popularBooks = fetchPopularBooks.results;
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }

  const totalPages = Math.ceil(totalBooks / limit);

  return ( 
    <Box minH="100vh">
      <Container maxW="container.xl" py={8}>
        {/* Popular Books Section */}
        <Box mb={12}>
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading as="h1" size="xl">
              Popular
            </Heading>
            <Box as="span" color="teal.500" fontWeight="bold" cursor="pointer">
              View All
            </Box>
          </Flex>
          <PopularBooks books={popularBooks} />
        </Box>

        {/* All Books Section */}
        <Box>
          <Heading as="h2" size="lg" mb={6}>
            All Books
          </Heading>
          <BookGrid books={books}/>
        </Box>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} limit={limit} />
      </Container>
    </Box>
  );
};

export default BookPage;