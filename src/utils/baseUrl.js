export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://api.talkcall-crm.com/api'
  : 'http://localhost:8080/api'

export default baseUrl;
