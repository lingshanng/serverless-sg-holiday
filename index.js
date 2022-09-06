const axios = require('axios')

exports.handler = async function(event) {
  const options = {
    method: "GET",
    url: "https://calendarific.com/api/v2/holidays",
    params: {
      api_key: "4b8a19e93ee41ab2c68bac9e421051ba2a551845",
      country: "SG",
      year: "2022",
    }
  }
  
  let response = {
    status: 400,
    response: "Error occured while fetching data"
  }
  
  await axios(options)
    .then((res) => {
      if (res.status == 200) {
        response = {
          status: 200,
          response: processData(res.data.response)
        }
        
      }
    })
    .catch((err) => console.log(err));
  
  return response;
}

function processData(data) {
  data.holidays = data.holidays
    .filter(h => h.type.includes('National holiday'))
    .map(h => {
      return {
        name: h.name,
        description: h.description,
        date: h.date.iso
      }
    });
  return data;
}