import axios from 'axios';
import {
    GET_ALL_PRODUCTS,
    GET_DETAIL,
    EDIT_FOTO, EDIT_NAME, COMENTARIO, REVIEW,
    SEARCH_BY_NAME,
    LOGIN,
    SIGNUP,
    AGREGAR_PAGO,
    TRAER_PRODUCT_PAGOS,
    CUENTA,
    GET_USER_BY_ID,
    UPDATE_PROFILE

} from './variables';

export function getAllProducts() {
  return async function (dispatch) {
    const response = await axios.get('/products/');
    const allProducts = response.data;
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: allProducts,
    });
  };
}
export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/products/?name=${name}`);
      const filteredProduct = response.data;
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: filteredProduct,
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: [],
      });
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`/products/${id}`);
    const productId = response.data;
    return dispatch({
      type: GET_DETAIL,
      payload: productId,
    });
  };
}

export function getUserByID(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users/${id}`);
      const userInfo = response.data;
      return dispatch({
        type: GET_USER_BY_ID,
        payload: userInfo,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateProfile(email, name, address, favorite, cart, banned) {
  return async function (dispatch) {
    try {
      const response = await axios.put('/users', {
        email,
        name,
        address,
        favorite,
        cart,
        banned,
      });
      return dispatch({
        type: UPDATE_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function postSignUp(obj) {
  return async function (dispatch) {
    const response = await axios.post('/login/signup', obj);
    const userData = response.data;
    localStorage.setItem('token', userData.token);
    return dispatch({
      type: SIGNUP,
      payload: userData,
    });
  };
}

export function postLogin(obj) {
  return async function (dispatch) {
    const response = await axios.post('/login/login', obj);
    const userData = response.data;
    localStorage.setItem('token', userData.token);
    return dispatch({
      type: LOGIN,
      payload: userData,
    });
  };
}

export function agregarPago({ amount, id, email, nombre, idCurso }) {
  let token = localStorage.getItem('token');
  let obj = {
    amount,
    id,
    email,
    nombre,
    idCurso,
    token,
  };
  return async function (dispatch) {
    const response = await axios.post('/checkout', obj);
    const pagoData = response.data;
    return dispatch({
      type: AGREGAR_PAGO,
      payload: pagoData,
    });
  };
}

export function getProductosPagos() {
  let token = localStorage.getItem('token');
  return async function (dispatch) {
    try {
      const response = await axios.get(`/productHistory/${token}`);
      const pagoData = response.data;
      return dispatch({
        type: TRAER_PRODUCT_PAGOS,
        payload: pagoData,
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: TRAER_PRODUCT_PAGOS,
        payload: [],
      });
    }
  };
}

export const cuenta = (obj) => {

  return ({
    type: CUENTA,
    payload: obj
  })
}

export function editFoto(user) {
    return async function (dispatch) {
        const response = await axios.post("/undateFoto", user );
        const userData = response.data;
        console.log(userData);
        return dispatch({
            type: EDIT_FOTO,
            payload: userData,
        });
    };
}

export function editNombre(user) {
    return async function (dispatch) {
        const response = await axios.post("/undateNombre", user );
        const userData = response.data;
        console.log(userData);
        return dispatch({
            type: EDIT_NAME,
            payload: userData,
        });
    };
}

export function setReview(obj) {
    return async function (dispatch) {
        const response = await axios.post("/", obj );
        const data = response.data;
        console.log(data);
        return dispatch({
            type: REVIEW,
            payload: data,
        });
    };
}

export function setComentario(obj) {
    return async function (dispatch) {
        const response = await axios.post("/", obj );
        const data = response.data;
        console.log(data);
        return dispatch({
            type: COMENTARIO,
            payload: data,
        });
    };
}




