// types/Chat.ts
interface IUser {
  id: number;
  nama: string;
  slug: string;
  password: string;
  hasPassword: boolean;
  jenjangId: string;
  kelasJenjangId: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  gol_darah: string;
  nama_ortu: string;
  mahasiswa: boolean;
  foto: string;
  kelompokId: string;
  desaId: string;
  daerahId: string;
  createdAt: string;
  updatedAt: string;
}

interface IMessages {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
}

interface IPersonalChat {
  type: "personal";
  conversationId: string;
  user: IUser;
  lastMessage: string | null;
  createdAt: string;
  unreadCount: number;
}

interface IGroupChat {
  type: "group";
  conversationId: string;
  name: string;
  image: string | null;
  lastMessage: string | null;
  createdAt: string;
  unreadCount: number;
}

export type IChat = IPersonalChat | IGroupChat;

interface IMessageSender {
  id: number;
  nama: string;
  slug: string;
  foto: string;
}

interface IMessage {
  id: number;
  senderId: number;
  receiverId: number | null;
  groupId: number | null;
  content: string;
  createdAt: string;
  sender: IMessageSender;
  attachments: unknown[]; // ganti kalau sudah ada type
  reads: unknown[]; // ganti kalau sudah ada type
}

interface IMessageResponse {
  meta: {
    status: number;
    message: string;
  };
  data: IMessage[];
}

export type {
  IChat,
  IMessages,
  IUser,
  IGroup,
  IPersonalChat,
  IGroupChat,
  IMessageResponse,
  IMessage,
  IMessageSender,
  IMessage,
};
