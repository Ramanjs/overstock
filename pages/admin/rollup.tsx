import {useState, useEffect} from "react"
import { CompactTable  } from '@table-library/react-table-library/compact';

const Rollup = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    fetch('/api/admin/rollup')
    .then(res => res.json())
    .then(res => {
      console.log(res.results)
      setData({ nodes: res.results })
    })
  }, [])

  const columns = [
    { label: 'Seller ID', renderCell: (item: any) => item.seller_id ? item.seller_id : '-' },
    { label: 'Shoe ID', renderCell: (item: any) => item.shoe_id ? item.shoe_id : '-' },
    { label: 'Category', renderCell: (item: any) => item.name ? item.name : '-' },
    { label: 'Commission', renderCell: (item: any) => item.commission }
  ]

  return (
    <section className="w-full p-8">
      <div className="w-full max-w-screen-lg mx-auto">
        {data.nodes && <CompactTable columns={columns} data={data} />}
      </div>
    </section>
  )
}

export default Rollup
