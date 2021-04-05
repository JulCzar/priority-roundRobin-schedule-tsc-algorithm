import Process from './model/Process';
import Thread from './model/Thread';
import { sendToConsole, timer } from './utils';

const priorityScheduler = (function () {
  const state = {
    isRunning: false
  }
  const setRunning = (newState: boolean) => {
    state.isRunning = newState
  }

  const threadQueue: Thread[] = []

  function addThread(thread: Thread) {
    sendToConsole(`\tAdicionando ${thread.name} à fila. PRIORIDADE: ${thread.priority}\n`)

    threadQueue.push(thread)

    threadQueue.sort(function (threadA, threadB) {
      if (threadA.priority > threadB.priority)
        return 1
      if (threadA.priority < threadB.priority)
        return -1
      return 0
    })

    if (!state.isRunning) {
      runThreads()
      setRunning(true)
    }
  }

  async function runThreads() {
    sendToConsole('Iniciando processamento da fila\n')

    while (threadQueue.length) {
      const thread = threadQueue.shift()
      if (!thread) return
      thread.setStatus(Process.RUNNING)

      thread.run()
      await timer(thread.burstTime)

      thread.updateRemainingTime(thread.remainingTime)
      
      thread.setStatus(Process.COMPLETED)
      
      sendToConsole(`${thread.name} finalizou\n`)
    }
    setRunning(false)

    sendToConsole('Fila Limpa! Parando execução\n')
  }

  return {
    addThread
  }
})();

export default priorityScheduler