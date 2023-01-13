//import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
//import tw from 'twin.macro';
import dynamic from 'next/dynamic';
import Box from "/components/Balls";
const NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
      <div className='relative h-screen bg-gray-600'>
        <div className='relative w-screen h-screen'>
        < Box /></div>
        
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 pointer-events-none'>
          <div className='text-center flex flex-col justify-center items-center h-screen'>
            <div className='pb-52 md:pb-24'>
              <div className='text-base font-extrabold text-gray-300'>
                HI THERE I'M
              </div>
              <div className='md:text-8xl text-7xl font-black tracking-tighter'>
                <div className='md:-mb-4 -mb-2'>Natalia</div>
                <div>Lazuardi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default NextPage
