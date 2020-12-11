import axios from 'axios';

const LoginService = (data) => {
  return axios.post('http://localhost:4000/login', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error.toJSON();
    })
};

export default LoginService;
