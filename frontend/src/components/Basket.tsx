interface BasketProps {
  isBasketOpen: boolean;
}

const Basket: React.FC<BasketProps> = ({ isBasketOpen }) => {
  return (
    <>
      <div className={
        isBasketOpen
          ? "navbar flex flex-col gap-2 absolute w-fit top-full right-0 right-0 bg-white shadow-md border-t-2 border-[#F5F5F5] transition p-2 z-40 w-96"
          : "navbar flex flex-col gap-2 absolute w-fit top-full right-0 right-0 bg-white shadow-md border-t-2 border-[#F5F5F5] transition p-2 z-40 w-96 translate-x-[102%]"
      }>
      </div>    
    </>
  )
}

export default Basket;