import {useEffect, useState} from "react"
import { useRouter } from "next/router"
import { mensImages, womensImages, kidsImages } from "@/images/imageUrls"
import Link from "next/link"

const Shoes = () => {
  const router = useRouter()
  const { category } = router.query
  const [shoes, setShoes] = useState([])

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  useEffect(() => {
    fetch('/api/shoe')
    .then(res => res.json())
    .then(res => {
      let shoesImages = res.results.map((shoe: any) => {
        if (shoe.category_id === 1) {
          shoe.imageUrl = mensImages[shoe.shoe_id % 3]
        } else if (shoe.category_id === 2) {
          shoe.imageUrl = womensImages[shoe.shoe_id % 3]
        } else {
          shoe.imageUrl = kidsImages[shoe.shoe_id % 3]
        }
        return shoe
      });

      if (category) {
        shoesImages = shoesImages.filter((shoe:any) => shoe.category_id == category)
      }
      shuffleArray(shoesImages)
      setShoes(shoesImages)
    })
  }, [category])

  return (
    <section className="w-full p-8">
      <div className="w-full flex justify-between flex-wrap space-4">
        {shoes.map((shoe: any, index: number) => (
          <Link href={`shoes/${shoe.shoe_id}`} key={index} className="w-[30%] my-4 flex flex-col justify-between border-2 border-gray-100 rounded-md">
            <div className="w-full h-72">
              <img className="w-full h-full object-cover" src={shoe.imageUrl} alt="shoe"/>
            </div>
            <div className="p-2">
              <p className="mb-4 text-lg font-bold">{shoe.name}</p>
              <p>&#8377; {shoe.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Shoes
