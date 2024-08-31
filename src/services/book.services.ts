import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

export const bookServices = {
    getBooks,
    getPopularBooks,
};

async function getBooks(start: number, limit: number) {
    const session = await getServerSession(authOptions) as any;
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/book/list`;
    const addQuery = `?start=${start}&limit=${limit}`;
    
    const headersList = headers();
    const response = await fetch(`${fullUrl}${addQuery}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.jwt}`,
            'Cookie': headersList.get('cookie') || '',
        },
    });

    return response.json();
}

async function getPopularBooks(limit: number) {
    const session = await getServerSession(authOptions) as any;
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/book/popular`;
    const addQuery = `?limit=${limit}`;
    
    const headersList = headers();
    const response = await fetch(`${fullUrl}${addQuery}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.jwt}`,
            'Cookie': headersList.get('cookie') || '',
        },
    });

    return response.json();
}