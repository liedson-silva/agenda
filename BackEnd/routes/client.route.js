import { Router } from "express"
import { CreateAppointment, GetAppointmentByUser } from "../controllers/client.controller.js"
import auth from "../middleware/auth.js";

const clientRouter = Router()

clientRouter.post("/create-appointment", auth, CreateAppointment)
clientRouter.get('/my-appointments', auth, GetAppointmentByUser);

export default clientRouter