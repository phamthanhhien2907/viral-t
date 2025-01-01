import axiosConfig from "../axios";
export const apiGetLotteryById = (id, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/evaluate/lottery/${id}/${userId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdateTimer = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/evaluate/lottery/updateTime`,
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetCountdownTimer = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/evaluate/lottery/countdownTimer`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetLotteryHistory = (roomId, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/evaluate/historyLottery/${roomId}/${userId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllLottery = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/evaluate/lottery",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCreateLottery = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/evaluate/lottery/create",
        data,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiUpdateLottery = (roomId, userId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/evaluate/lottery/updated/${roomId}/${userId}`,
        data,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiUpdateUserIntoRoom = (roomId, userId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/evaluate/lottery/updateUserIntoRoom/${roomId}/${userId}`,
        data,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetRoomById = (roomId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/evaluate/roomDetails/${roomId}`,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetCountDown = (roomId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/evaluate/countdown`,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiDeleteLotteryById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/evaluate/lottery/delete/${id}`,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to delete movie", error);
    }
  });
export const apiUpdateResult = (roomId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/evaluate/lottery/updateResult/${roomId}`,
        data,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
