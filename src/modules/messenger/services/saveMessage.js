import axios from 'axios';

const SaveMessage = (data) => {
  return axios.post('http://localhost:4000/new-msg', data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error.toJSON();
    })
};

export default SaveMessage;
