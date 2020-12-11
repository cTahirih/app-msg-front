import axios from 'axios';

const RegisterService = (data) => {
  return axios.post('http://localhost:4000/register', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error.toJSON();
    })
};

export default RegisterService;
