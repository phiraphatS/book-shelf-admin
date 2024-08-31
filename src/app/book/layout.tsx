'use client';

import React, { Suspense } from 'react';
import BookHeaderComponent from "@/components/book-components/header";
import DefaultLayout from "@/components/default-layout";
import { Box, Spinner } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <DefaultLayout>
            <Suspense fallback={<Box p={4}><Spinner /></Box>}>
                <BookHeaderComponent />
            </Suspense>
            {children}
        </DefaultLayout>
    )
}