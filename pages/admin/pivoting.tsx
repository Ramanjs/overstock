import {useState, useEffect} from "react"
import { CompactTable  } from '@table-library/react-table-library/compact';

const Pivoting = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    fetch('/api/admin/pivoting')
    .then(res => res.json())
    .then(res => {
      console.log(res.results)
      setData({ nodes: res.results })
    })
  }, [])

  const columns = [
    { label: 'Seller ID', renderCell: (item: any) => item.seller_id },
    { label: 'Shoe ID', renderCell: (item: any) => item.shoe_id },
    { label: '2022', renderCell: (item: any) => item["2022"] },
    { label: '2023', renderCell: (item: any) => item["2023"] }
  ]

  return (
    <section className="w-full p-8">
      <div className="w-full max-w-screen-lg mx-auto">
        {data.nodes && <CompactTable columns={columns} data={data} />}
      </div>
    </section>
  )
}

export default Pivoting
