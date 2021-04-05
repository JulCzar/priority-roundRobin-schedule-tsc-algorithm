import { format } from 'date-fns'

/**
 * function that sort a pseudo-random integer using Math.random() method
 * @param amplitude Range size of the generated numbers
 * @param initialValue Start point to generate values, will be round to floor
 */
export const sortValue = (amplitude: number, initialValue: number = 0) => {
  return Math.floor(Math.random() * amplitude) + Math.floor(initialValue)
}

/**
 * The following code was take from stack overflow, over the link: https://stackoverflow.com/questions/6921895/synchronous-delay-in-code-execution
 * 
 * this function will return a promise that will take the number of ms passed as param to resolve
 * @param ms time in milliseconds to wait
 */
export function timer(ms: number) {
  return new Promise<void>(function (resolve, reject) {
    setTimeout(resolve, ms)
  });
}

/**
 * Run an callback after some time 
 * @param callback function that will be executed after the delay
 * @param ms delay in milliseconds
 */
export async function doAfter(callback: Function, ms: number = 0, ...params: any[]) {
  await timer(ms)

  callback(...params)
}

export const sendToConsole = (...message: any[]) => {
  const now = new Date()
  console.log(format(now, '[hh:mm:ss:SSS]'), ...message)
}