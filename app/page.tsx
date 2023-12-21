import Link from 'next/link'

export default function Home() {
  let href = '/home'
  return(
    <div className="w-screen h-screen bg-primary flex justify-center items-center text-Mint">
    <div className="w-full max-w-[600px] mx-auto">
      <h1 className="text-7xl mb-4 text-tertiary">ErgocraftAI</h1>
      <p className="text-2xl mb-4 text-tertiary/50">high production, no back-pain ;) </p>
      <div className="flex justify-center">
        <Link href={href}>
          <button className="btn btn-primary bg-secondary p-4 rounded-lg text-xl text-primary ">Get started</button>
        </Link>
      </div>
  </div>
  </div>
  )
}