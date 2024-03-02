// 가장 뜨거운 코인 top3
//const myKey = "12379dbf-30e0-4b89-92d0-b369a074adc1";
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
  
    topCoinRender()
  }catch(error){
    console.log("error message: " + error)
    errorRender(response.status);
  }
}

// const render = () => {
//   // hot 3
//   const hotList = coinList.slice(0,3);
//   let hotHTML = ""

//   for(i=0; i<hotList.length; i++){
//     hotHTML += `
//     <tr class="hot-list list">
//       <td>${hotList.indexOf(hotList[i])+1}</td>
//       <td id = "name">${hotList[i]["name"]}</td>
//       <td id = "symbol">${hotList[i]["symbol"]}</td>
//       <td id = "24h">${
//         hotList[i]["quote"].USD["percent_change_24h"].toFixed(2) + "%"
//       }</td>
//     </tr>
//     `
//   }

//    document.getElementById("hot-container").innerHTML = hotHTML;

//   // cold 3
//   const coldList = coinList.slice(-3);
//   let coldHTML = ""

//   for(i=0; i<coldList.length; i++){
//     coldHTML += `
//     <tr class="cold-list list">
//       <td>${coldList.indexOf(coldList[i])+1}</td>
//       <td id = "name">${coldList[i]["name"]}</td>
//       <td id = "symbol">${coldList[i]["symbol"]}</td>
//       <td id = "24h">${
//         coldList[i]["quote"].USD["percent_change_24h"].toFixed(2) + "%"
//       }</td>
//     </tr>
//     `
// document.getElementById("cold-container").innerHTML = coldHTML;

// }
// }


// 가장 뜨거운 코인, 가장 차가운 코인 top3
const topCoinRender = () => {
  // hot top3
  const hotList = coinList
  .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
  .slice(0, 3);
  let hotHTML = "";

  for (i = 0; i < hotList.length; i++) {
    hotHTML += `<div class="hot-list list">
      <div class="coin-left">
        <div class="coin-rank">${hotList.indexOf(hotList[i]) + 1}</div>
        <div class="coin-names">
          <div class="coin-name">${hotList[i]["name"]}</div>
          <div class="coin-symbol">${hotList[i]["symbol"]}</div>
        </div>
      </div>
      <div class="coin-24h">${
        hotList[i]["quote"].USD["percent_change_24h"].toFixed(2) + "%"
      }</div>
    </div>`;
  }
  document.getElementById("hot-container").innerHTML = hotHTML;

  // cold top3
  const coldList = coinList
  .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
  .slice(0, 3);
  let coldHTML = "";

  for (i = 0; i < coldList.length; i++) {
    coldHTML += `<div class="cold-list list">
      <div class="coin-left">
        <div class="coin-rank">${coldList.indexOf(coldList[i]) + 1}</div>
        <div class="coin-names">
          <div class="coin-name">${coldList[i]["name"]}</div>
          <div class="coin-symbol">${coldList[i]["symbol"]}</div>
        </div>
      </div>
      <div class="coin-24h">${
        coldList[i]["quote"].USD["percent_change_24h"].toFixed(2) + "%"
      }</div>
    </div>`;
  }
  document.getElementById("cold-container").innerHTML = coldHTML;
};




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