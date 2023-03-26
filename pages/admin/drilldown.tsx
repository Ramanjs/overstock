import {useState, useEffect} from "react"
import { CompactTable  } from '@table-library/react-table-library/compact';

const Drilldown = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    fetch('/api/admin/drilldown')
    .then(res => res.json())
    .then(res => {
      console.log(res.results)
      setData({ nodes: res.results })
    })
  }, [])

  const columns = [
    { label: 'Seller ID', renderCell: (item: any) => item.seller_id },
    { label: 'Shoe ID', renderCell: (item: any) => item.shoe_id },
    { label: 'Category', renderCell: (item: any) => item.name },
    { label: 'Sales', renderCell: (item: any) => item.sales },
  ]

  return (
    <section className="w-full p-8">
      <div className="w-full max-w-screen-lg mx-auto">
        {data.nodes && <CompactTable columns={columns} data={data} />}
      </div>
    </section>
  )
}

export default Drilldown
