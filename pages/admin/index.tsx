import Link from "next/link"

const Admin = () => {
  return (
    <section className="w-full p-8">
      <div className="w-full flex flex-col space-y-4">
        <h1 className="text-lg">Choose the OLAP Query</h1>
        <Link href={'/admin/rollup'}>Rollup</Link>
        <Link href={'/admin/slicing'}>Slicing</Link>
        <Link href={'/admin/pivoting'}>Pivoting</Link>
        <Link href={'/admin/drilldown'}>Drill down</Link>
      </div>
    </section>
  )
}

export default Admin
