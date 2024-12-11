export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://restrain.pw/api'
  // : 'http://192.168.0.131:8000';
  : 'http://localhost:8080/api'

export default baseUrl;
