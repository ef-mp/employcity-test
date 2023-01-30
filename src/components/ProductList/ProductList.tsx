import {ProductCard} from "../ProductCard/ProductCard";
import './style.css'
import {observer} from "mobx-react-lite";
import {useMst} from "../../models/RootModel";


export const ProductList = observer(() => {

  const {
    cart,
    shop
  } = useMst()


  const {
    sortedProductGroups,
  } = shop

  const {
    addProductToCart,
    getIsAddedToCart,
    removeCartEntryById,
  } = cart

  return (
    <ul className="product-list">
      {
        sortedProductGroups.map(({ name, id, products }) => (
          <li className="product-list__item" key={id}>
            <h2 className="product-list__title">
              {name}
            </h2>

            <div className="product-list__products">
              {
                products.map((product) => {

                  const {
                    name,
                    amount,
                    price,
                    groupId,
                    id: productId
                  } = product

                  return (
                    <ProductCard
                      key={productId}
                      id={productId}
                      groupId={groupId}
                      name={name}
                      amount={amount}
                      price={price}
                      onAddToCart={addProductToCart}
                      isAddedToCart={getIsAddedToCart(productId)}
                      onDelete={removeCartEntryById}
                    />
                  )
                })
              }
            </div>
          </li>
        ))
      }
    </ul>
  )
})