import axios from 'axios';

const GetUserByIDService = (data) => {
  return axios.post('http://localhost:4000/user', data)
    .then(res => {
      console.log(res);
      return res.data
    })
    .catch(error => {
      return error.toJSON();
    })
};

export default GetUserByIDService;
