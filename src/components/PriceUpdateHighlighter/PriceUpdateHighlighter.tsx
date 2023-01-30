import {observer} from "mobx-react-lite";
import {Children} from "../../types/shared";
import {useMst} from "../../models/RootModel";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import './style.css'
import {mulDecimals} from "../../utils/decimal";
import cn from "classnames";


interface PriceUpdateHighlighterProps {
  priceInRouble: number,
  renderPrice: (calculatedPrice: number) => Children
}

export const PriceUpdateHighlighter = observer((props: PriceUpdateHighlighterProps) => {

  const {
    priceInRouble,
    renderPrice
  } = props

  const {
    dollarExchangeRate: {
      rate
    }
  } = useMst()

  const productPriceRef = useRef<HTMLDivElement>(null)
  const prevRateValueRef = useRef(rate)

  const [highlightClassName, setHighlightClassName] = useState("")


  const resetClassName = useCallback(() => setHighlightClassName(''), [])

  useEffect((): any => {
    const prevRateValue = prevRateValueRef.current

    if (prevRateValue === rate) return

    prevRateValueRef.current = rate

    if (rate > prevRateValue) {
      return setHighlightClassName('product-price--up-highlight')
    }

    setHighlightClassName('product-price--down-highlight')
  }, [rate])

  useEffect(() => {
    const productPriceNode = productPriceRef.current

    if (!productPriceNode) return

    productPriceNode.addEventListener('animationend', resetClassName)

    return () => productPriceNode.removeEventListener('animationend', resetClassName)
  }, [resetClassName])


  const calculatedPrice = useMemo(() => {
    return mulDecimals(priceInRouble, rate)
  }, [priceInRouble, rate])


  return (
    <span ref={productPriceRef} className={cn('product-price', highlightClassName)}>
      {renderPrice(calculatedPrice)}
    </span>
  )
})