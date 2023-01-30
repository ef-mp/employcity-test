import {applySnapshot, types} from "mobx-state-tree";
import {getRandomInteger} from "../utils/getRandomNumber";
import nodeWindowPolyfill from "node-window-polyfill";

if (typeof window === 'undefined') {
  nodeWindowPolyfill.register();
}

export const DollarExchangeRateModel = types.model({
  rate: types.number
})
  .actions(self => {

    let intervalId = 0;

    const changeRate = () => {
      applySnapshot(self, {
        rate: getRandomInteger(50, 80)
      })
    }

    // Обновляем курс доллара каждые 20 секунд
    const afterCreate = () => {
      intervalId = window?.setInterval && window?.setInterval(changeRate, 20000)
    }

    const beforeDestroy = () => window?.clearInterval(intervalId)

    return {
      changeRate,
      afterCreate,
      beforeDestroy,
    }
  })
