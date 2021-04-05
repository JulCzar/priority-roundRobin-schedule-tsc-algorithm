import { sendToConsole } from '../utils'
import Process from './Process'

/**
 * @param {string} processName 
 * @param {number} arrivalTime 
 * @param {number} burstTime 
 * @param {function} code 
 */
class Thread {
  arrivalTime: number
  burstTime: number
  code: Function
  remainingTime: number
  name: string
  priority: number
  status: string
  
  constructor(name: string, arrivalTime: number, burstTime: number, priority:number, code: Function) {
    this.arrivalTime = arrivalTime
    this.burstTime = burstTime
    this.code = code
    this.name = name
    this.priority = priority
    this.remainingTime = burstTime
    this.status = Process.CREATED
  }

  setStatus(status: Process) {
    this.status = status
  }

  updateRemainingTime(timeRunning: number) {
    this.remainingTime -= timeRunning

    if (this.remainingTime === this.burstTime)
      this.setStatus(Process.COMPLETED)
  }

  run() {
    sendToConsole(`  Iniciando ${this.name}\n    Priority: ${this.priority}\n    BurstTime: ${this.burstTime}\n    ArrivalTime: ${this.arrivalTime}\n    RemainingTime: ${this.remainingTime}\n`)

    this.code(this)
  }
}

export default Thread