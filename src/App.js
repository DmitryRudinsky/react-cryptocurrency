import React from 'react';
import "./styles/index.scss"
import AppLayout from "./components/layout/AppLayout";
import {CryptoContexProvider} from "./context/crypto-contex";

function App() {
    return (
          <CryptoContexProvider>
              <AppLayout/>
          </CryptoContexProvider>
    );
}

export default App;
