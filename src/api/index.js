import axios from 'axios';



export const getPlacesData = async (type, sw, ne) => {
  try {
    // const response = await axios.get(URL, options);

    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      method: 'GET',
      // url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
      params: {
        bl_latitude: '11.847676',
        tr_latitude: '12.838442',
        bl_longitude: '109.095887',
        tr_longitude: '109.149359',
      },
      headers: {
        'X-RapidAPI-Key': '6477183ae3mshe9459d9e69c72c8p11a35fjsn67b633ad1b18',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};