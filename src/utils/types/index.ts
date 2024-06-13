export interface User {
    created_at?: string;
    deleted_at?: string | null;
    dob?: string | null;
    email?: string;
    first_name?: string;
    gender?: string | null;
    id?: number;
    user_id?: number;
    is_email_verified?: boolean;
    last_activity?: string | null;
    last_name?: string;
    location?: string | null;
    membership_id?: string;
    membership_type?: string;
    middle_name?: string;
    occupation?: string | null;
    phone?: string;
    role?: string;
    suspended?: boolean;
    title?: string;
    updated_at?: string;
  }