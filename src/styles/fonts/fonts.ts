import { Rubik, Noto_Serif_Thai } from 'next/font/google'

export const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
})

export const notoSerifThai = Noto_Serif_Thai({
  subsets: ['thai'],
  weight: ['400', '700'],
  display: 'swap',
})