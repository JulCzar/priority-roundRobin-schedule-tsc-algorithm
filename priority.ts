import Thread from './src/model/Thread'
import priorityScheduler from './src/priorityScheduler'

import { doAfter, sortValue } from './src/utils'
import { threadCode } from './src/services/code'

const PROCESSOS = 10;

(async function () {
  for (let i = 0; i < PROCESSOS; ++i) {
    const arrivalTime = sortValue(5000)
    const burstTime = sortValue(4000, 1000)
    const priority = sortValue(10)
    const thread = new Thread(`Thread${i}`, arrivalTime, burstTime, priority, threadCode)

    await doAfter(priorityScheduler.addThread, arrivalTime, thread)
  }
})()