import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('access-token');

export const REGISTER = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${base_url}auth/register`,data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const LOGIN = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${base_url}auth/login`,data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};


export const ADD_CART = (data) =>{
    return new Promise((resolve, reject) => {
    axios
      .post(`${base_url}cart/addCart`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}



// ------------------------------------ DELETE -------------------

export const DELETE_CART = (id) =>{
    return new Promise((resolve, reject) => {
    axios
      .delete(`${base_url}cart/DeleteCartById/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}