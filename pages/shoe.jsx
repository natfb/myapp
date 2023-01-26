//import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
//import tw from 'twin.macro';
import dynamic from 'next/dynamic';
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import Shoe from '/components/shoe/shoe'
import Astronaut from '/components/shoe/astronaut'
//import Track from '/components/Track'

const NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
    <div className='relative w-[50%] h-[50vh] p-0'>
    {/*<Shoe /> */} 
<Astronaut />
    </div>
    </div>
  )
}

export default NextPage