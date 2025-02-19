import axios from "axios";

export async function fetchAllNasabah() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/nasabah`
    );
    if (response.data[0]) {
      return response.data;
    } else {
      return { message: "Tidak ada user" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchNasabah(cif) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/nasabah?cif=${cif}`
    );
    if (response.data[0]) {
      return response.data[0];
    } else {
      return { message: "Tidak ada user" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function downloadSummary(cif, period) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/downloadPdf?cif=${cif}&startDate=${period}`,
      {
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
