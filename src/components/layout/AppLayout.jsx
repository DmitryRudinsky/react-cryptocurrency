import AppHeader from "./AppHeader";
import {Layout, Spin} from "antd";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import React, {useContext} from "react";
import CryptoContex from "../../context/crypto-contex";

export default function AppLayout(){

  const {loading} = useContext(CryptoContex);

  if (loading) {
    return <Spin fullscreen/>
  }

  return(
    <Layout>
      <AppHeader/>
      <Layout>
        <AppSider/>
        <AppContent/>
      </Layout>
    </Layout>
  )
}