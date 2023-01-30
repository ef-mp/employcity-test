import React from "react";
import {useMst} from "../../models/RootModel";
import {observer} from "mobx-react-lite";
import './style.css'
import {Button} from "../common/Button/Button";
import { RoubleSymbol } from "../../contants/markup";
import {
  BiPlus,
  BiMinus,
  BiX,
  BiBasket
} from 'react-icons/bi'
import cn from "classnames";
import {TruncateText} from "../common/TruncateText/TruncateText";
import {PriceUpdateHighlighter} from "../PriceUpdateHighlighter/PriceUpdateHighlighter";

export const Cart = observer(() => {
  const {
    cart: {
      products,
      totalPrice,
      isEmpty
    }
  } = useMst()


  return (
    <div className="cart">
      <div className="cart__sticky-container">

        {
          isEmpty ?
            (
              <div className="cart__empty-container">
                <BiBasket className="cart__empty-icon" />
                <span className="cart__empty-text">Пусто</span>
              </div>
            ) :
            (
              <div className="cart__content">
                {
                  products.map((cartEntry) => {
                    const {
                      product,
                      amount,
                      isMaxAmount,
                      increaseAmount,
                      decreaseAmount,
                      isLast,
                    } = cartEntry

                    if (!product) return null

                    const {
                      name,
                      id,
                      price
                    } = product

                    return (
                      <div className="cart__item" key={id}>

                        <TruncateText className="cart__item-name">
                          {name}
                        </TruncateText>


                        <PriceUpdateHighlighter
                          priceInRouble={price}
                          renderPrice={calculatedPrice => (
                            <TruncateText className="cart__item-price" title={String(calculatedPrice)}>
                              {calculatedPrice} {RoubleSymbol}
                            </TruncateText>
                          )}
                        />

                        <div className="cart__change-amount">
                          <Button
                            title={isMaxAmount ? `На складе всего ${amount} товаров` : ''}
                            className="cart__change-amount-btn"
                            disabled={isMaxAmount}
                            onClick={increaseAmount}
                          >
                            <BiPlus />
                          </Button>

                          <span className="cart__amount">
                        {amount}
                      </span>

                          <Button
                            onClick={decreaseAmount}
                            className={cn('cart__change-amount-btn', {
                              'cart__change-amount-btn--delete': isLast
                            })}
                          >
                            {isLast ? <BiX /> : <BiMinus />}
                          </Button>
                        </div>

                      </div>
                    )
                  })
                }

                <PriceUpdateHighlighter
                  priceInRouble={totalPrice}
                  renderPrice={calculatedPrice => (
                    <TruncateText className="cart__total-price" title={String(calculatedPrice)}>
                      {calculatedPrice} {RoubleSymbol}
                    </TruncateText>
                  )}
                />
              </div>
            )
        }

      </div>
    </div>
  )
})