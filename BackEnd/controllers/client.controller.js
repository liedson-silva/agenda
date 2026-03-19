import ClientModel from "../models/client.model.js";

export async function CreateAppointment(req, res) {
    try {
        const { date, hour, client, details, hand, foot } = req.body;
        const userId = req.userId;

        if (!date || !hour || !client) {
            return res.status(400).json({
                message: 'Campos obrigatórios não preenchidos!',
                error: true, success: false
            })
        }

        if (!hand && !foot) {
            return res.status(400).json({
                message: 'Selecione ao menos um serviço (Mão ou Pé)!',
                error: true, success: false
            })
        }

        const existingAppointment = await ClientModel.findOne({ date, hour });
        if (existingAppointment) {
            return res.status(400).json({
                message: 'Já possui um agendamento para este horário!',
                error: true, success: false
            });
        }

        const payload = { date, hour, client, details, hand, foot, userId }
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
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({
                message: "Nenhum agendamento encontrado!",
                error: true, success: false
            });
        }

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

