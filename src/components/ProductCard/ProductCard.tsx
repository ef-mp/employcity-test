import React, {useCallback} from "react";
import { Button } from "../common/Button/Button";
import './style.css'
import {TruncateText} from "../common/TruncateText/TruncateText";
import {RoubleSymbol} from "../../contants/markup";
import { BiImage } from "react-icons/bi";
import {PriceUpdateHighlighter} from "../PriceUpdateHighlighter/PriceUpdateHighlighter";

interface ProductCardProps {
  id: number,
  groupId: number,
  name: string,
  amount: number,
  price: number,
  onAddToCart: (id: number) => void,
  isAddedToCart: boolean
  onDelete: (id: number) => void
}

export const ProductCard = (props: ProductCardProps) => {

  const {
    name,
    price,
    id,
    onAddToCart,
    onDelete,
    isAddedToCart,
  } = props

  const addToCartHandler = useCallback(() => {
    onAddToCart(id)
  }, [id, onAddToCart])

  const deleteHandler = useCallback(() => {
    onDelete(id)
  }, [id, onDelete])


  return (
    <div className="product-card">
      <div className="product-card__image">
        <BiImage />
      </div>

      <PriceUpdateHighlighter
        priceInRouble={price}
        renderPrice={calculatedPrice => (
          <TruncateText className="product-card__price" title={String(calculatedPrice)}>
            {calculatedPrice} {RoubleSymbol}
          </TruncateText>
        )}
      />

      <TruncateText
        className="product-card__name"
        children={name}
      />

      {
        !isAddedToCart ?
          (
            <Button className="product-card__button" onClick={addToCartHandler}>
              В корзину
            </Button>
          ) :
          (
            <Button className="product-card__button product-card__button--delete" onClick={deleteHandler}>
              Удалить
            </Button>
          )
      }

    </div>
  )
}