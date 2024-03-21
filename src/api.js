import {cryptoAssets} from "./data"

export function fetchAssets(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1)
  })
}