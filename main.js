// 가장 뜨거운 코인 top3
//const myKey = "f3ca5cbf-842e-439f-829e-45f6a648fca2";
let coinList = [];
let response;

const getTopCoin = async () => {
  try{
    coinList = [];
    const hotUrl = new URL(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`);
    //console.log("hot" + hotUrl);
    response =  await fetch(hotUrl, {
      headers: {
      'X-CMC_PRO_API_KEY': myKey,
      },
    })
    console.log("response",response.status)
    const coinData = await response.json();
    //console.log("coinData",coinData)
    coinList = coinData.data;
    //console.log(coinList);
  
    render()
  }catch(error){
    console.log("error message: " + error)
    errorRender(response.status);
  }
}

const render = () => {
  // hot 3
  const hotList = coinList.slice(0,3);
  let hotHTML = ""

  for(i=0; i<hotList.length; i++){
    hotHTML += `
    <tr class="hot-list list">
      <td>${hotList.indexOf(hotList[i])+1}</td>
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
    <tr class="cold-list list">
      <td>${coldList.indexOf(coldList[i])+1}</td>
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div>
오류가 발생했습니다. 
나중에 다시 시도해주세요.${errorMessage} 
  </div>`;

  const containers = document.querySelectorAll(".container");

  containers.forEach(container => {
    container.innerHTML = errorHTML;
  });
}

getTopCoin();