'use client';

import BookHeaderComponent from "@/components/book-components/header";
import DefaultLayout from "@/components/default-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <DefaultLayout>
            {/* Header */}
            <BookHeaderComponent />
            {children}
        </DefaultLayout>
    )
}