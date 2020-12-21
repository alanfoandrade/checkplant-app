import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://hooks.zapier.com/hooks/catch/472009/09rj5z/?email_key=alanfrank@gec.inatel.br',
});

export default api;
