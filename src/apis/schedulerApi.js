import axios from "axios";

export async function fetchSchedulerGenerate() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/getScheduler`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function changeSchedulerGenerate(tanggal, jam, menit) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/updateScheduler?menit=${menit}&jam=${jam}&tanggal=${tanggal}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function changeSchedulerSend(tanggal, jam, menit) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/updateSchedulerSend?menit=${menit}&jam=${jam}&tanggal=${tanggal}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
