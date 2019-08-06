import TmcClient from "tmc-client-js"
import fetchPonyfill from "fetch-ponyfill"
import axios from "axios"
import * as store from "store"
import uuidv4 from "uuid/v4"

const { fetch } = fetchPonyfill()
const BASE_URL = "https://tmc.mooc.fi/api/v8"
const ORGANIZATION = "mooc"
const COURSE = "tikape-syksy-19"

const tmcClient = new TmcClient(
  "59a09eef080463f90f8c2f29fbf63014167d13580e1de3562e57b9e6e4515182",
  "2ddf92a15a31f87c1aabb712b7cfd1b88f3465465ec475811ccce6febb1bad28",
)

const loginStateListeners = []

export function authenticate(credentials) {
  return new Promise((resolve, reject) => {
    tmcClient.authenticate(credentials).then(
      res => {
        if (
          typeof window !== "undefined" &&
          typeof window.Quiznator !== "undefined"
        ) {
          window.Quiznator.setUser({
            id: res.username,
            accessToken: res.accessToken,
          })
        }
        loginStateChanged()
        resolve(res)
      },
      err => {
        reject(err)
      },
    )
  })
}

export function createAccount(data) {
  data.username = uuidv4()
  const body = {
    user: data,
    origin: "Tietokantojen perusteet 2019",
    language: "fi",
  }
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/users`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      res.json().then(json => {
        if (!json.success) {
          reject(json.errors)
        } else {
          resolve(json)
        }
      })
    })
  })
}

export function resetPassword(email) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/users/password_reset`, {
      body: JSON.stringify({ email: email, origin: window.location.host }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      res.json().then(json => {
        resolve(json)
      })
    })
  })
}

export function loggedIn() {
  return accessToken() ? true : false
}

export function signOut() {
  if (
    typeof window !== "undefined" &&
    typeof window.Quiznator !== "undefined"
  ) {
    window.Quiznator.removeUser()
  }
  store.remove("tmc.user")
  store.remove("tmc.user.details")
  loginStateChanged()
}

export function onLoginStateChanged(callback) {
  loginStateListeners.push(callback)
}

export async function userDetails() {
  const res = await axios.get(
    `${BASE_URL}/users/current?show_user_fields=true&extra_fields=tietokantojen-perusteet-2019`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
    },
  )
  store.set("tmc.user.details", res.data)
  return res.data
}

export async function getCachedUserDetails() {
  let details = store.get("tmc.user.details")
  if (!details) {
    details = await userDetails()
  }
  return details
}

const createHeader = () => ({
  Authorization: `Bearer ${accessToken()}`,
})

const setPasswordFields = (
  user,
  currentPassword,
  password,
  confirmPassword,
) => {
  user["old_password"] = currentPassword
  user["password"] = password
  user["password_repeat"] = confirmPassword
}

export async function updateUserDetails({ extraFields, userField }) {
  const res = await axios.put(
    `${BASE_URL}/users/current`,
    {
      user: {
        extra_fields: {
          namespace: "tietokantojen-perusteet-2019",
          data: extraFields,
        },
      },
      user_field: userField,
    },
    { headers: { Authorization: `Bearer ${accessToken()}` } },
  )
  await userDetails()
  return res
}

export function updatePassword(currentPassword, password, confirmPassword) {
  setPasswordFields(userDetails, currentPassword, password, confirmPassword)
  const id = userDetails["id"]

  return axios
    .put(`${BASE_URL}/users/${id}`, userDetails, { headers: createHeader() })
    .then(res => {
      return res
    })
    .catch(error => {
      return Promise.reject(error.response)
    })
}

export async function fetchProgrammingExerciseDetails(exerciseName) {
  const res = await axios.get(
    `${BASE_URL}/org/${ORGANIZATION}/courses/${COURSE}/exercises/${exerciseName}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
    },
  )
  return res.data
}

export async function fetchProgrammingExerciseModelSolution(exerciseId) {
  const res = await axios.get(
    `${BASE_URL}/exercises/${exerciseId}/model_solutions`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
    },
  )
  return res.data
}

export async function fetchProgrammingProgress(exerciseName) {
  const res = await axios.get(
    `${BASE_URL}/org/${ORGANIZATION}/courses/${COURSE}/users/current/progress`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
    },
  )
  return res.data?.points_by_group
}

export function canDoResearch() {
  try {
    return store.get("tmc.user.details")?.extra_fields?.research === "1"
  } catch (error) {
    return false
  }
}

function loginStateChanged() {
  loginStateListeners.forEach(listener => {
    listener(loggedIn())
  })
}

export function accessToken() {
  try {
    return store.get("tmc.user").accessToken || null
  } catch (error) {
    return null
  }
}
