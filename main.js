// 가장 뜨거운 코인 top3
//const myKey = "f3ca5cbf-842e-439f-829e-45f6a648fca2";
let latestList = [];

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
  latestList = data.
}

getHotTop();