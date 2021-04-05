import Process from './model/Process'
import Thread from './model/Thread'
import { sendToConsole, timer } from './utils'

const QUANTUM = 1000;

const roundRobinScheduler = (function () {
  const state = { isRunning: false }

  const setRunning = (newState: boolean) => {
    state.isRunning = newState
  }
  const threadQueue: Thread[] = []

  function addThread(thread: Thread) {
    sendToConsole(`\tAdicionando ${thread.name} à fila.\n`)
    threadQueue.push(thread)

    if (!state.isRunning) {
      setRunning(true)
      run()
    }
  }

  async function run() {
    sendToConsole('Iniciando processamento da fila\n')

    while (threadQueue.length) {
      const thread = threadQueue.shift()
      if (!thread) break

      thread.setStatus(Process.RUNNING)

      const { remainingTime } = thread
      const willComplete = remainingTime < QUANTUM
      
      thread.run()
      await timer(willComplete?remainingTime:QUANTUM)

      thread.updateRemainingTime(willComplete?remainingTime:QUANTUM)
      thread.setStatus(willComplete?Process.COMPLETED:Process.STOPPED)

      if (!willComplete) {
        sendToConsole(`\t\t${thread.name} não finalizou! Pausando Processo e adicionando-o ao final da fila\n`)
        
        addThread(thread)
      }else sendToConsole(`${thread.name} finalizou\n`)
      
    }
    setRunning(false)

    sendToConsole('Fila Limpa! Parando execução\n')
  }

  return {
    addThread,
  }
})();

export default roundRobinScheduler