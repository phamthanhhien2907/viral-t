import axiosConfig from "../axios";
export const apiGetWithDrawById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/transform/withdraw/" + id,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllWithDraw = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/transform/withdraw",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
// export const apiCreateLottery = (data) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axiosConfig({
//         method: "POST",
//         url: "/evaluate/lottery/create",
//         data,
//       });
//       resolve(response);
//     } catch (error) {
//       console.log("Failed to get product", error);
//     }
//   });
// export const apiUpdateLottery = (id, data) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axiosConfig({
//         method: "POST",
//         url: "/evaluate/lottery/" + id,
//         data,
//       });
//       resolve(response);
//     } catch (error) {
//       console.log("Failed to get product", error);
//     }
//   });
