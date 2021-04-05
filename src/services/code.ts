import Process from '../model/Process'
import Thread from '../model/Thread'

export const threadCode = (thread: Thread) => {
  thread.setStatus(Process.COMPLETED)
}