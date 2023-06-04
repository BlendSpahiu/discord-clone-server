import { Model } from 'objection';
import { ServerMemberProps } from '../interfaces/models/Server.model';

export default class ServerModel extends Model {
    id!: number;
    serverName!: string;
    members?: ServerMemberProps[];
    textChannels?: string[];
    voiceChannels?: string[];

    static get tableName() {
        return 'servers';
    }
}
