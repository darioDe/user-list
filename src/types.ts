export interface User {
    id: number,
    name: string,
    email: string,
    gender: string,
    status: string,
};

export interface NewUser {
    name: string,
    email: string,
    gender: string,
    status: string,
};

export interface ModalProps {
    onClose: () => void,
    onAddUser: (user: NewUser) => void;
};

export interface ButtonProps {
    onAddUser: (user: NewUser) => void;
};

export interface ModalDeleteProps {
    handleDelete: (userId: number) => void,
    setSelectedUser: (user: User | null) => void ,
    name: string,
    id: number,
};