import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Swap from '../components/Swap'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Aggregator Dex</title>
        <meta name="description" content="Aggregator Dex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header/>
      <div className='mainWindow'>
        <Swap/>
      </div>
    </>
  )
}
