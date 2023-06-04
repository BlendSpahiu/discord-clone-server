import { ServerRoles } from '../interfaces/enums/ServerRoles.enums';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import { ServerProps } from '../interfaces/models/Server.model';
import ServerModel from '../models/Server.model';
import { failure, ok } from '../utils';

export const ServerService = {
    createServer: async (data: ServerProps) => {
        const { userId, serverName } = data;

        const server = await ServerModel.query().insert({
            serverName,
            members: [{ userId, role: ServerRoles.MEMBER }],
            voiceChannels: [],
            textChannels: [],
        });

        return ok({ server });
    },

    getServers: async () => {
        const servers = await ServerModel.query();

        return ok({ servers });
    },

    getServerById: async (id: number) => {
        const serverById = await ServerModel.query().findById(id);

        if (!serverById) {
            return failure('Server not found!', StatusCodeEnums.NOT_FOUND);
        }

        return ok({ server: serverById });
    },

    updateServer: async (id: number, serverName: string) => {
        const serverExists = await ServerModel.query().findById(id);

        if (serverExists) {
            const updatedServer = await ServerModel.query().where({ id }).update({ serverName });

            return ok({ server: updatedServer });
        } else {
            return failure('Server does not exist!', StatusCodeEnums.NOT_FOUND);
        }
    },
};
