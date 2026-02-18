import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className=' flex justify-center items-center flex-col gap-1'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link  className=' bg-alert py-2 px-4 rounded-3xl' href="/">Return Home</Link>
    </div>
  )
}