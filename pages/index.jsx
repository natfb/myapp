//import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
//import tw from 'twin.macro';
import dynamic from 'next/dynamic';
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import Ball from '/components/balls/Balls'
import Bear from '/components/paralax-bear/Paralax'
import Scene from '/components/car-game/Scene'


const NextPage = () => {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
</div>
    <div className='fixed top-0 left-0 w-screen h-screen bg-black '>
        <Ball/></div>
      <div className='absolute inset-0 h-screen p-0 pb-52 md:pb-24 mt-96 text-center'>
         
            
              <div className='mb-96 text-base font-extrabold text-white '>
                HI THERE
              </div>

              <div className='mt-56 text-slate-100'>
              <p className='text-6xl font-bold tracking-tighter mb-10'>More 3D Sttuf</p>
              <Link className=' decoration-none text-2xl font-medium tracking-normal z-40' target="_blank" href="/bear">Bear</Link>
              <Link className=' decoration-none font-medium tracking-normal text-2xl  z-40 pl-10' target="_blank" href="/car">Car</Link>
              <Link className=' decoration-none text-2xl font-medium tracking-normal z-40 pl-10' target="_blank" href="/shoe">Shoe</Link>
              </div>   
        
      </div>
      
    <div className='absolute bg-white w-full mt-96 left-0'>
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
      </footer></div>
    </>
  )
}

export default NextPage
