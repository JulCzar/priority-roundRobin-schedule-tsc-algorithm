import Thread from './src/model/Thread'
import roundRobinScheduler from './src/roundRobinScheduler'

import { doAfter, sortValue } from './src/utils'
import { threadCode } from './src/services/code'

const PROCESSOS = 10;

(async function () {
  for (let i = 0; i < PROCESSOS; ++i) {
    const arrivalTime = sortValue(5000)
    const burstTime = sortValue(4000, 1000)
    const priority = sortValue(10)
    const thread = new Thread(`Thread${i}`, arrivalTime, burstTime, priority, threadCode)

    await doAfter(roundRobinScheduler.addThread, arrivalTime, thread)
  }
})()