export interface TaskInt {
    id: string,
    val: string,
    isDone: boolean,
    isDeleted: boolean,
    isImp: boolean
  }

export interface ModalTask {
  id: string,
  label: string,
  title: string,
  details: string
}