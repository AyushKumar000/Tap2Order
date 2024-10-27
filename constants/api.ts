// api.js
// do not use the local host url
// use the url after tunneling it fom ngrok
const BASE_URL = 'https://8987-2409-40f4-1015-58f6-11e9-f61d-ea66-a0c7.ngrok-free.app/api';

export const getSignInEndpoint = () => `${BASE_URL}/auth/signin`;
export const getSignUpEndpoint = () => `${BASE_URL}/auth/signup`;
export const getSignOutEndpoint = () => `${BASE_URL}/auth/signout`;
export const getMenuEndpoint = () => `${BASE_URL}/menu`;
export const getVendorEndpoint = () => `${BASE_URL}/vendor`;
export const getCartEndpoint = () => `${BASE_URL}/cart`;

// You can add more endpoints here as needed
