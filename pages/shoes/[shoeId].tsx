import { useRouter } from "next/router"
import {useEffect, useState} from "react"
import { mensImages, womensImages, kidsImages } from "@/images/imageUrls";

type Shoe = {
  shoe_id: number
  name: string
  color: string
  price: number
  size: string
  weight: number
  quantity: number
  category_id: number
  category: string
  imageUrl: string
};

const ShoeId = () => {
  
  const router = useRouter()

  const { shoeId } = router.query
  const [shoe, setShoe] = useState<Shoe>()
  const [bought, setBought] = useState(false)

  useEffect(() => {
    fetch(`/api/shoe/${shoeId}`)
    .then(res => res.json())
    .then(res => {
      const tempShoe = res.results[0]
      console.log(tempShoe)
      if (tempShoe.category_id === 1) {
        tempShoe.category = "Men's Shoe"
        tempShoe.imageUrl = mensImages[tempShoe.shoe_id % 3]
      } else if (tempShoe.category_id === 2) {
        tempShoe.category = "Women's Shoe"
        tempShoe.imageUrl = womensImages[tempShoe.shoe_id % 3]
      } else {
        tempShoe.category = "Kid's Shoe"
        tempShoe.imageUrl = kidsImages[tempShoe.shoe_id % 3]
      }
      setShoe(tempShoe)
    })
  }, [])

  if (shoe === undefined) {
    return <div></div>
  }

  return (
    <section className="w-full p-8">
      <div className="w-full max-w-screen-lg mx-auto flex justify-between">
        <div className="w-1/2 h-96">
          <img className="w-full h-full object-cover" src={shoe.imageUrl} alt="shoe"/>
        </div>
        <div className="w-1/2 px-8 flex flex-col items-start justify-between">
          <div>
            <h1 className="font-bold text-2xl text-left underline">{shoe.name}</h1>
            <p className="my-2">{shoe.category}</p>
          </div>
          <div>
            <p>Color: {shoe.color}</p>
            <p>Size: {shoe.size}</p>
            <p>Weight: {shoe.weight} grams</p>
          </div>
          <p>MRP: &#8377; {shoe.price}</p>
          {bought && <p className="text-green-600">Successfully purchased item! Auto discount of 10% added</p>}
          {bought && <p className="text-green-600">Final price: &#8377; {shoe.price * 0.9}</p>}
          <div className="w-full text-center py-2 text-white bg-black rounded-3xl cursor-pointer" onClick={() => setBought(true)}>Add to Bag</div>
        </div>
      </div>
    </section>
  )
}

export default ShoeId
