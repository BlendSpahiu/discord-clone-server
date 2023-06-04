import { ServerRoles } from '../enums/ServerRoles.enums';

export interface ServerProps {
    serverName: string;
    userId: number;
}

export interface ServerMemberProps {
    userId: number;
    role: ServerRoles | string;
}
