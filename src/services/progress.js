import { fetchProgrammingProgress } from "./moocfi"
import { zip } from "../util/arrays"
import { fetchQuiznatorProgress } from "./quiznator"
import { fetchSQLTrainerProgress } from "./sqltrainer"

export async function fetchProgress() {
  const serviceIdentifiers = ["Ohjelmointitehtävät", "Kyselyt", "SQL Trainer"]
  const progressesCollection = await Promise.all([
    fetchProgrammingProgress(),
    fetchQuiznatorProgress(),
    fetchSQLTrainerProgress(),
  ])
  const progressByGroup = {}

  zip(serviceIdentifiers, progressesCollection).forEach(
    ([identifier, progresses]) => {
      console.log(identifier, progresses)
      if (!progresses) {
        return
      }
      progresses.forEach(progressEntry => {
        if (!progressByGroup[progressEntry.group]) {
          progressByGroup[progressEntry.group] = {}
        }
        progressByGroup[progressEntry.group][identifier] = progressEntry
      })
    },
  )
  const toBeDeleted = []
  //   Object.entries(progressByGroup).forEach(([group, serviceEntries]) => {
  //     if (!Object.keys(serviceEntries).find(o => o === "Ohjelmointitehtävät")) {
  //       toBeDeleted.push(group)
  //     }
  //   })
  toBeDeleted.forEach(o => {
    delete progressByGroup[o]
  })
  return progressByGroup
}
