export interface TaskInt {
    id: string,
    val: string,
    isDone: boolean,
    isDeleted: boolean,
    isImp: boolean
  }

export interface ModalTask {
  id: string,
  date: string,
  prior: string,
  title: string,
  details: string,
  done: boolean,
}