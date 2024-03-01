// 가장 뜨거운 코인 top3
//const myKey = "f3ca5cbf-842e-439f-829e-45f6a648fca2";
let coinList = [];

const getHotTop = async () => {
  const hotUrl = new URL(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`);
  console.log("hot" + hotUrl);
  const response =  await fetch(hotUrl, {
    headers: {
    'X-CMC_PRO_API_KEY': myKey,
    },
  })
  console.log("response",response)
  const coinData = await response.json();
  console.log("coinData",coinData)
 coinList = coinData.data;
  console.log(coinList);

  render()
}

const render = () => {
  // hot 3
  const hotList = coinList.slice(0,3);
  let hotHTML = ""

  for(i=0; i<hotList.length; i++){
    hotHTML += `
    <tr class="hot-list">
      <td id = "name">${hotList[i]["name"]}</td>
      <td id = "symbol">${hotList[i]["symbol"]}</td>
      <td id = "24h">${
        hotList[i]["quote"].USD["percent_change_24h"].toFixed(2) + "%"
      }</td>
    </tr>
    `
  }

   document.getElementById("hot-container").innerHTML = hotHTML;

  // cold 3
  const coldList = coinList.slice(-3);
  let coldHTML = ""

  for(i=0; i<coldList.length; i++){
    coldHTML += `
    <tr class="cold-list">
      <td id = "name">${coldList[i]["name"]}</td>
      <td id = "symbol">${coldList[i]["symbol"]}</td>
      <td id = "24h">${
        coldList[i]["quote"].USD["percent_change_24h"].toFixed(2) + "%"
      }</td>
    </tr>
    `
document.getElementById("cold-container").innerHTML = coldHTML;

}
}
getHotTop();