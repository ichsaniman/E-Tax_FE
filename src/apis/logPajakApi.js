import axios from "axios";

export async function getLogPajakByCif(cif) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/log-pajak?cif=${cif}`
    );
    if (response.data) {
      return response.data;
    } else {
      return { message: "Tidak ada user" };
    }
  } catch (error) {
    console.error(error);
  }
}
