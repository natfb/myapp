//import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
//import tw from 'twin.macro';
import dynamic from 'next/dynamic';
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";

import Bear from '/components/paralax-bear/Paralax'


const NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
    <div className='relative h-[50vh] w-[50vw] p-0'>
    <Bear />  
    </div>
    </div>
  )
}

export default NextPage