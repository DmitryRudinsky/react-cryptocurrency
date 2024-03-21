import React, {useEffect, useState} from 'react';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {Layout, Card, Statistic, List, Typography, Spin, Tag} from 'antd';
import {fetchAssets} from "../../api"
import {persentDifference, capitalize} from "../../utils"


const siderStyle = {
  padding: "1rem",
};
const AppSider = () => {

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

  if (loading) {
    return <Spin fullscreen/>
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{marginBottom: "1rem"}}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
            prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {title: "Total Profit", value: asset.totalProfit, withTag: true},
              {title: "Total Amount", value: asset.amount, isPlain: true},
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && <Tag color={asset.grow ? "green" : "red"}>{asset.growPercent}%</Tag>}
                  {item.isPlain && item.value}
                    {!item.isPlain &&
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;