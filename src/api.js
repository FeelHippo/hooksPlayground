const axios = require('axios');

const API_URL = 'https://www.rijksmuseum.nl/api/en/collection'
const API_KEY = 'jreU73w9'

const api = () => {
  return {
    getMany: async (option, word) => {
      if (word) {word = word.split(' ').join('+')};
      const API_END = word ? `${API_URL}?key=${API_KEY}&${option}=${word}` : `${API_URL}?key=${API_KEY}`
      try {
        const responseBody = await axios.get(API_END);
        return responseBody.data;
      } catch (e) {
          console.log(e.response.data);
      }
    },
    getOne: async (id) => {
      const API_END = `${API_URL}/${id}?key=${API_KEY}`
      try {
        const responseBody = await axios.get(API_END);
        return responseBody.data.artObject;
      } catch (e) {
          console.log(e.response.data);
      }
    }
  }
}

export default api;
