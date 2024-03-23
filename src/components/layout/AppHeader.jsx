import {Button, Layout, Select, Space, Modal, Drawer } from 'antd';
import React, {useEffect, useState} from 'react';
import {useCrypto} from "../../context/crypto-contex";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  textAlign: 'center',
  width: "100%",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};


const AppHeader = () => {
  const {crypto} = useCrypto();
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);


  function handleSelect(value){
    setModal(true);
    setCoin(crypto.find((c) => c.id === value))
  }

  useEffect(() => {
    const keyPress = (event) => {
      if(event.key === "/" || event.key === "."){
        setSelect((prev) => !prev);
      }
    };

    document.addEventListener("keypress", keyPress);
    return () => document.removeEventListener("keypress", keyPress);
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        style={{
          width: '250px',
        }}
        value="press / to open"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              src={option.data.icon}
              alt={option.data.value}
              style={{width: "20px"}}
            /> {" "}
            {option.data.value}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      <Modal
             open={modal}
             onCancel={() => setModal(false)}
             footer={null}>
        <CoinInfoModal coin={coin}/>
      </Modal>

      <Drawer
        title="Add Asset"
        open={drawer}
        onClose={() => setDrawer(false)}
        width={600}
      >
        <AddAssetForm/>
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;