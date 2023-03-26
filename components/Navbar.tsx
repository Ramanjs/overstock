import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center">
      <svg aria-hidden="true" className="pre-logo-svg" focusable="false" viewBox="0 0 24 24" role="img" width="44px" height="44px" fill="none">
        <path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd"></path>
      </svg>
      <div className="flex space-x-4 items-center">
        <Link href="/shoes/men">Men</Link>
        <Link href="/shoes/women">Women</Link>
        <Link href="/shoes/kids">Kids</Link>
      </div>
      <div></div>
    </div>
  )
}

export default Navbar
