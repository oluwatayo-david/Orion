export interface SignupData {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
    business_name: string;
    business_address: string;
    primary_contact_address: string;
    state: string;
    country: string;
}

export interface AuthState {
    user: any;
    loading: boolean;
    error: string | null;
}
