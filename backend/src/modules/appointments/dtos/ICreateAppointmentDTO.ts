export default interface ICreateAppointmentDTO {
  provider_id: string
  user_id: string
  observation?: string
  date: Date
}
