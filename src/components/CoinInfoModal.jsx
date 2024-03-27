import {Flex, Typography, Tag, Divider} from 'antd';

const CoinInfoModal = ({coin}) => {
  return (
    <>
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: 10}}/>
        <Typography.Title level={2} style={{margin: 0}}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>

      <Divider/>

      <Typography.Paragraph>
        <Typography.Text>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text>Price: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text>Price BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text>Market Cap: </Typography.Text>
        {coin.marketCap}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text>Contract Address: </Typography.Text>
        {coin.contractAddress}
      </Typography.Paragraph>
    </>
  );
};

export default CoinInfoModal;