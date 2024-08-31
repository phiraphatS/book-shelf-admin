'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { SearchIcon, BellIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import { ShoppingCart } from 'lucide-react';

const BookHeaderComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const search = searchParams.get('search');
    setSearchTerm(search || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    router.push(window.location.pathname);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mb={8}>
      <form onSubmit={handleSearch} style={{ maxWidth: '60%', width: '100%' }} autoComplete='off'>
        <InputGroup size="lg">
          <Input 
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement>
            {searchTerm ? (
              <IconButton
                aria-label="Clear search"
                icon={<CloseIcon />}
                variant="ghost"
                onClick={clearSearch}
              />
            ) : (
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                variant="ghost"
                type="submit"
              />
            )}
          </InputRightElement>
        </InputGroup>
      </form>
      <Flex alignItems="center" gap={4}>
        <IconButton
          aria-label="Shopping cart"
          icon={<ShoppingCart size={24} />}
          variant="ghost"
        />
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon boxSize={6} />}
          variant="ghost"
        />
        <Button leftIcon={<AddIcon />} colorScheme="teal" size="md">
          add a book
        </Button>
      </Flex>
    </Flex>
  );
};

export default BookHeaderComponent;