import { useState } from "react"
import DailyMenu from "./DailyMenu"

const Breakfast = {
  name: "Hamburguesa del Chef",
  description: "Deliciosa hamburgesa con los ingredientes necesarios para empezar el día",
  background: "https://cdn.sanity.io/images/jsdrzfkj/production-esmx/5e2316cc629ede9cd6646163efeafc5486161751-6240x4160.jpg?w=800&h=533&fit=crop"
}
const Lunch = {
  name: "Pasta Primavera",
  description: "Deliciosa pasta con verduras frescas de temporada",
  background: "https://cdn.loveandlemons.com/wp-content/uploads/2022/06/pasta-primavera.jpg"
}

const Dinner = {
  name: "Filete de Salmón a la Parrilla",
  description: "Sabroso filete de salmón a la parrilla con guarnición de vegetales",
  background: "https://simplementerecetas.com/wp-content/uploads/2021/01/SALMON-A-LA-PARRILLA-750x406.jpg"
}

const Options = [
  { name: "Desayuno", bg: "https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg", obj: Breakfast },
  { name: "Almuerzo", bg: "https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", obj: Lunch },
  { name: "Cena", bg: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", obj: Dinner }
]
function LandingPage() {

  const [dailyFood, setDailyFood] = useState(Breakfast)

  return (
    <div className="text-white flex justify-center max-w-[100vw] py-8 ">
      <div className="w-[90%] max-w-[1280px] ">
        <p className="pb-2 text-xl">Tu Insta menú:</p>
        <div className="grid grid-cols-[3fr_1fr] gap-5">
          <DailyMenu background={dailyFood.background} name={dailyFood.name} description={dailyFood.description} />
          <div className="grid grid-rows-3 gap-2 text-center">
            {Options.map((e) =>
            (
              <div
                className="relative w-[100%] aspect-video rounded-lg flex flex-col justify-center hover:cursor-pointer hover:scale-105 duration-300"
                onClick={() => { setDailyFood(e.obj) }} key={e.name}
              >
                <img src={e.bg} alt={e.name} className="absolute w-[100%] h-[100%] z-0 rounded-xl" />
                <div className="bg-slate-600/80 flex w-full h-full justify-center items-center rounded-lg z-10">
                  <p className="block">{e.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <p className="text-left pt-8">Nuevas comidas</p>
          <div className="flex justify-center text-center items-center">
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{"<"}</button>
            <div className="grid grid-cols-3 w-[100%] gap-8 m-6">
              <div className="w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
            </div>
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{">"}</button>
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <p className="text-left pt-8">Nuevas comidas</p>
          <div className="flex justify-center text-center items-center">
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{"<"}</button>
            <div className="grid grid-cols-3 w-[100%] gap-8 m-6">
              <div className="w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
            </div>
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{">"}</button>
          </div>
        </div>
      </div>

    </div>
  )
}
export default LandingPage