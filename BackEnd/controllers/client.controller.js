import ClientModel from "../models/client.model.js";

export async function CreateAppointment(req, res) {
    try {
        const { date, hour, client, details, hand, foot, busso, eyebrow } = req.body;
        const userId = req.userId;

        if (!date || !hour || !client) {
            return res.status(400).json({
                message: 'Campos obrigatórios não preenchidos!',
                error: true, success: false
            })
        }

        if (!hand && !foot && !busso && !eyebrow) {
            return res.status(400).json({
                message: 'Selecione ao menos um serviço (Mão, Pé, Busso ou Sobrancelha)!',
                error: true, success: false
            })
        }

        const existingAppointment = await ClientModel.findOne({ date, hour, userId: req.userId });
        if (existingAppointment) {
            return res.status(400).json({
                message: 'Já possui um agendamento para este horário!',
                error: true, success: false
            });
        }

        const payload = { date, hour, client, details, hand, foot, busso, eyebrow, userId }
        const newClient = new ClientModel(payload)
        const save = await newClient.save()

        return res.json({
            message: "Cliente agendado com sucesso!",
            data: save, success: true, error: false
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        })
    }
}

export async function GetAppointmentByUser(req, res) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                message: "Usuário não identificado!",
                error: true,
                success: false
            });
        }

        const appointments = await ClientModel.find({ userId }).sort({ date: 1, hour: 1 });

        return res.json({
            message: "Agendamentos do usuário carregados!",
            data: appointments,
            success: true,
            error: false
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function DeleteAppointment(req, res) {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const appointment = await ClientModel.findOne({ _id: id, userId });

        await ClientModel.deleteOne({ _id: id, userId });

        return res.json({
            message: "Agendamento deletado com sucesso!",
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    }
}

export async function UpdateAppointment(req, res) {
    try {
        const { id } = req.params;
        const { date, hour, client, details, hand, foot, busso, eyebrow } = req.body;
        const userId = req.userId;

        if (!date || !hour || !client) {
            return res.status(400).json({
                message: 'Campos obrigatórios não preenchidos!',
                error: true, success: false
            })
        }

        if (!hand && !foot && !busso && !eyebrow) {
            return res.status(400).json({
                message: 'Selecione ao menos um serviço (Mão, Pé, Busso ou Sobrancelha)!',
                error: true, success: false
            })
        }

        const conflict = await ClientModel.findOne({ date, hour, userId, _id: { $ne: id } });
        if (conflict) {
            return res.status(400).json({
                message: "Você já possui outro agendamento neste horário!",
                error: true,
                success: false
            });
        }

        const updatedAppointment = await ClientModel.findOneAndUpdate(
            { _id: id, userId },
            { date, hour, client, details, hand, foot, busso, eyebrow },
            { new: true }
        );

        return res.json({
            message: "Agendamento atualizado com sucesso!",
            data: updatedAppointment,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    }
}
