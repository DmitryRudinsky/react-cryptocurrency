import React, {useRef, useState} from 'react';
import {useCrypto} from "../context/crypto-contex";
import {Flex, Select, Space, Typography, Divider, Form, InputNumber, Button, DatePicker, Result} from "antd";
import CoinInfo from "./CoinInfo";


const validateMessages = {
  required: '${label} is required',
  types: {
    number: '${label} is not valid number'
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  },
}

const AddAssetForm = ({onClose}) => {
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();
  const {crypto, addAsset} = useCrypto();
  const assetRef = useRef();

  if(submitted){
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    )
  }


  if (!coin) {
    return (
      <Select
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        style={{
          width: '100%',
        }}
        placeholder="Select Coin"
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
    )
  }

  function onFinish(value) {
    const newAsset = {
      id: coin.id,
      amount: value.amount,
      price: value.price,
      date: value.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset)
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(price * value).toFixed(2)
    })
  }

  function handlePriceChange(value){
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2)
    })
  }

  return (
    <Form name="basic"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 10,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            price: coin.price.toFixed(2)
          }}
          onFinish={onFinish}
          validateMessages={validateMessages}
    >
      <CoinInfo coin={coin}/>

      <Divider/>


      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          onChange={handleAmountChange}
          placeholder="Enter coin amount"/>
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{width: "100%"}}/>
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime/>
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{width: "100%"}}/>
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;