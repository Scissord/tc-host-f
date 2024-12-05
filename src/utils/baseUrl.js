export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://restrain.pw/api'
  : 'http://192.168.0.142:8000';

export default baseUrl;
