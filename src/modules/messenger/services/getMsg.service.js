import axios from 'axios';

const MsgService = () => {
  return axios.get('http://localhost:4000/message');
};

export default MsgService;
