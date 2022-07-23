import axios from "axios";

export const convertToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const getBase64FromUrl = (
  url: string
): Promise<string | ArrayBuffer | null> => {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(url, {
      responseType: "blob",
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(res.data);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
