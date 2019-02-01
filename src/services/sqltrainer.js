import axios from "axios"
import { accessToken } from "./moocfi"

const BASE_URL = "https://sql-t.herokuapp.com"

export async function fetchSQLTrainerProgress() {
  const res = await axios.get(
    `${BASE_URL}/api/courses/tikape-k19/users/current/progress`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
    },
  )
  return res.data?.points_by_group
}
