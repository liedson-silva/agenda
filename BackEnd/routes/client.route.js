import { Router } from "express"
import { CreateAppointment, DeleteAppointment, GetAppointmentByUser, UpdateAppointment } from "../controllers/client.controller.js"
import auth from "../middleware/auth.js";

const clientRouter = Router()

clientRouter.post("/create-appointment", auth, CreateAppointment)
clientRouter.get('/my-appointments', auth, GetAppointmentByUser);
clientRouter.delete('/delete-appointment/:id', auth, DeleteAppointment);
clientRouter.put('/update-appointment/:id', auth, UpdateAppointment);

export default clientRouter