'use client';
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, limit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const start = (page - 1) * limit;
    const params = new URLSearchParams(searchParams);
    params.set('start', start.toString());
    params.set('limit', limit.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <Flex justify="space-between" align="center" mt={8}>
      <Button
        leftIcon={<ChevronLeftIcon />}
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      <Flex>
        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? 'solid' : 'ghost'}
            colorScheme={page === currentPage ? 'teal' : 'gray'}
            mx={1}
            onClick={() => typeof page === 'number' && onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </Flex>
      <Button
        rightIcon={<ChevronRightIcon />}
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;