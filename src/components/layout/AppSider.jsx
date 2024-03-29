import React from 'react';
import {Layout, Card, Statistic, List, Typography, Tag} from 'antd';
import {capitalize, colorchoice, arrowchoice, tagcolorchoice, typecolorchoice} from "../../utils"
import {useCrypto} from "../../context/crypto-contex";


const siderStyle = {
  padding: "1rem",
};
const AppSider = () => {
  const {assets} = useCrypto();

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => {
        return (
          <Card key={asset.id} style={{marginBottom: "1rem"}}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{color: colorchoice(asset)}}
              prefix={arrowchoice(asset)}
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
                  {item.withTag && <Tag color={tagcolorchoice(asset)}>{asset.growPercent}%</Tag>}
                    {item.isPlain && item.value}
                    {!item.isPlain &&
                      <Typography.Text type={typecolorchoice(asset)}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>}
                </span>
                </List.Item>
              )}
            />
          </Card>
        )
      })}
    </Layout.Sider>
  );
};

export default AppSider;