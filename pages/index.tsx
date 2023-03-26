import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import landing1 from '@/images/landing1.webp'
import landing2 from '@/images/landing2.webp'

export default function Home() {
  return (
    <>
      <Head>
        <title>Overstock</title>
        <meta name="description" content="One stop place for shoes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full flex flex-col items-center">
        <section className="w-full h-[75vh] px-16 flex justify-between">
          <div className="w-[49%] h-full">
            <Image src={landing1} className="w-full h-full object-cover" alt="hero"/>
          </div>
          <div className="w-[49%] h-full">
            <Image src={landing2} className="w-full h-full object-cover" alt="hero"/>
          </div>
        </section>
        <section className="py-8">
          <Link href={'/'} className="my-4 text-white bg-black rounded-3xl px-4 py-2">Shop Now</Link>
        </section>
      </main>
    </>
  )
}
