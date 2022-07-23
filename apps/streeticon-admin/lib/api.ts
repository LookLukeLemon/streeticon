import axios from "axios";

export const fetchStoreProfile = async () => {
  return await axios.get(`/store/profile`);
};
