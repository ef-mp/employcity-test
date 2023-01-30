import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {useMst} from "../../models/RootModel";
import {ProductList} from "../../components/ProductList/ProductList";
import {Spinner} from "../../components/common/Spinner/Spinner";
import nodeWindowPolyfill from "node-window-polyfill";

if (typeof window === 'undefined') {
  nodeWindowPolyfill.register();
}


export const ProductListContainer = observer(() => {

  const {
    shop
  } = useMst()

  const {
    loading,
    fetchProducts,
  } = shop

  const intervalIdRef = useRef<number>(0)

  useEffect(() => {

    // каждые 15 сек перезапрашиваем данные продуктов
    intervalIdRef.current = window?.setInterval(() => fetchProducts(false), 15000)

    const intervalId = intervalIdRef.current

    return () => window?.clearInterval(intervalId)
  }, [fetchProducts])

  if (loading) return <Spinner loading />

  return (
    <ProductList/>
  )
})