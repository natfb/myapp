//import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
//import tw from 'twin.macro';
import dynamic from 'next/dynamic';
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import Ball from '/components/Balls'
import Bear from '/components/Paralax'
import Scene from '/components/Scene'
import Track from '/components/Track'
const Scenee = dynamic(() => import('/components/Scene'), {
  ssr: false
});

const NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
    <div className='relative h-screen w-full p-0'>
    <Scene />  
    </div>
    </div>
  )
}

export default NextPage