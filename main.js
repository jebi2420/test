// 가장 뜨거운 코인 top3
const myKey = "";

const getHotTop = async () => {
  const hotUrl = new URL(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`);
  console.log("hot" + hotUrl);
  const response =  await fetch(hotUrl, {
    headers: {
    'X-CMC_PRO_API_KEY': myKey,
    },
  })
  console.log("response",response)
  const data = await response.json();
  console.log("data",data)
}

getHotTop();