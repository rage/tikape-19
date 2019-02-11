import axios from "axios"
import { accessToken } from "./moocfi"
import { flatten, getCommonElements } from "../util/arrays"
import { fetchAbGroup } from "./abstudio"

const BASE_URL = "https://quiznator.mooc.fi"

export async function fetchManyQuizDetails(quizIds) {
  const res = await axios.post(
    `${BASE_URL}/api/v1/quizzes/stripped`,
    { quizIds },
    { headers: { Authorization: `Bearer ${accessToken()}` } },
  )
  return res.data
}

export async function fetchQuiznatorProgress() {
  let res = []
  const partToTag = [
    {
      part: "osa01",
      tag: "tietokantojen-perusteet-k2019-1",
    },
    {
      part: "osa02",
      tag: "tietokantojen-perusteet-k2019-2",
    },
    {
      part: "osa03",
      tag: "tietokantojen-perusteet-k2019-3",
    },
    {
      part: "osa04",
      tag: "tietokantojen-perusteet-k2019-4",
    },
    {
      part: "osa05",
      tag: "tietokantojen-perusteet-k2019-5",
    },
    // {
    //   part: "osa06",
    //   tag: "tietokantojen-perusteet-k2019-6",
    // },
    // {
    //   part: "osa07",
    //   tag: "tietokantojen-perusteet-k2019-7",
    // },
  ]
  const quizIdInformation = await fetchQuizIds()
  const allQuizIds = flatten(quizIdInformation.map(o => o.quizIds))
  const progress = await fetchProgressByQuizIds(allQuizIds)
  const allAnswered = (progress.answered || []).map(o => o._id)
  const promises = partToTag.map(async ({ part, tag }) => {
    const relevant = quizIdInformation
      .filter(o => {
        return o.tags.indexOf(tag) !== -1
      })
      .map(o => o.quizIds)
    const quizIds = flatten(relevant)
    let decreaseMaxPoints = 1
    const { group } = await fetchAbGroup("self_evaluation_k19_tikape")
    if (group === 3) {
      decreaseMaxPoints = 0
    }
    const answered = getCommonElements(quizIds, allAnswered)
    const maxPoints = quizIds.length - decreaseMaxPoints
    const nPoints = answered.length
    const progress = Math.floor((nPoints / maxPoints) * 100) / 100
    res = res.concat({
      group: part,
      max_points: maxPoints,
      n_points: nPoints,
      progress,
    })
  })

  await Promise.all(promises)

  return res
}

export async function fetchQuizIds() {
  const res = await axios.post(
    `${BASE_URL}/api/v1/tags/quizids`,
    { tags: ["tietokantojen-perusteet-k2019"] },
    { headers: { Authorization: `Bearer ${accessToken()}` } },
  )
  return res.data
}

async function fetchProgressByQuizIds(quizIds) {
  const res = await axios.post(
    `${BASE_URL}/api/v1/answerers/progress`,
    { quizIds },
    { headers: { Authorization: `Bearer ${accessToken()}` } },
  )
  const data = res.data
  return data
}
