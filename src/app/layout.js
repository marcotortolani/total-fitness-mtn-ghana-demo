import { Oswald } from 'next/font/google'
import dynamic from 'next/dynamic'
import Providers from '@/providers/Providers'
import dictionary from '@/dictionary/lang.json'

const Header = dynamic(() => import('./components/ui/Header'), { ssr: false })
const Footer = dynamic(() => import('./components/ui/Footer'))
const DownBarMobile = dynamic(() => import('./components/ui/DownbarMobile'), {
  ssr: false,
})
import './globals.css'
import 'swiper/css'
import ChatBot from './components/ChatBot'

const oswald = Oswald({ subsets: ['latin'], preload: true })

export const metadata = {
  title: dictionary['Total Fitness'],
  description:
    dictionary[
      'Fitness content portal & workout routine creation app. Designed and developed by Media Moob.'
    ],
  version: '1.2.1',
  metadataBase: new URL('https://app-fitness-demo.vercel.app/'),
  openGraph: {
    title: dictionary['Total Fitness'],
    description:
      dictionary[
        'Fitness content portal & workout routine creation app. Designed and developed by Media Moob.'
      ],
    url: 'https://app-fitness-demo.vercel.app/',
    siteName: dictionary['siteName'],
    locale: dictionary['locale'],
    type: 'website',
    images: [
      {
        url: '/assets/totalfitness-horizontal.webp',
        width: 1921,
        height: 301,
        alt: dictionary['Total Fitness'],
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang={dictionary['lang']}>
      <body
        className={
          oswald.className +
          ` z-0 relative w-screen overflow-scroll overflow-x-hidden scroll-smooth flex flex-col items-center bg-DarkGray `
        }
      >
        <Header />
        <Providers>
          {children}
          <DownBarMobile />
          <ChatBot />
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
