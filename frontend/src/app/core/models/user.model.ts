export interface User {
    id?: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    role?: {
        id?: number;
        name: string;
    };
    direccionesJson?: string;
    metodosPagoJson?: string;
    wishlistJson?: string;
}
