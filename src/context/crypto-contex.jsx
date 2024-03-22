import {useEffect, useState, createContext} from 'react';
import {fetchAssets} from "../api";
import {persentDifference} from "../utils";


const CryptoContex = createContext({
  assets: [],
  crypto: [],
  loading: false
});


export function CryptoContexProvider({ children }){
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': 'wRT4xu8Q5kf7vyzOc0cXYpMYR3SDLZmuI/XVzr8aRz8='
      }
    };
    async function preload() {
      setLoading(true);
      const response = await fetch('https://openapiv1.coinstats.app/coins', options)
      const resultJSON = await response.json();
      const result = resultJSON.result
      const assets = await fetchAssets();
      setCrypto(result);
      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);
          return {
            grow: asset["price"] < coin["price"],
            growPercent: persentDifference(asset['price'], coin['price']),
            totalAmount: asset.amount * coin['price'],
            totalProfit: asset.amount * coin['price'] - asset.amount * asset['price'],
            ...asset
          }
        })
      );
      setLoading(false);
    }
    preload();
  }, []);

  return <CryptoContex.Provider value={{loading, crypto, assets}}>{children}</CryptoContex.Provider>
}

export  default CryptoContex;