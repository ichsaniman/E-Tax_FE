import axios from "axios";

export async function fetchDeliveryStatus(startDate, endDate, status) {
  const params = {};

  if (startDate) {
    params.startDate = startDate;
  }

  if (endDate) {
    params.endDate = endDate;
  }

  if (status) {
    params.status = status;
  }

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/statusdelivery`,
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
