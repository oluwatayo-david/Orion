// Types for Savings
export interface SavingsPlan {
    _id: string;
    _user: string;
    _wallet: string;
    amount: number;
    duration: '7days' | '14days' | '21days' | '30days' | '3months' | '6months' | '12months';
    startDate: string;
    status: 'active' | 'completed' | 'broken';
    createdAt: string;
    updatedAt: string;
    name?: string; // optional for UI
    target?: string; // optional for UI
    targetAmount?: number; // optional for UI
    progress?: number; // optional for UI calculation
    nextContribution?: string; // optional for UI
}

export interface SavingsFormData {
    amount: number;
    duration: '7days' | '14days' | '21days' | '30days' | '3months' | '6months' | '12months';
    name?: string;
    target?: string;
    targetAmount?: number;
    frequency?: 'daily' | 'weekly' | 'monthly';
    contributionMethod?: 'automatic' | 'manual';
}

export interface BreakSavingsResponse {
    success: boolean;
    message: string;
    data: {
        originalAmount: number;
        penaltyAmount: number;
        amountReceived: number;
        newBalance: number;
    };
}

export interface CreateSavingsResponse {
    success: boolean;
    message: string;
    data: {
        savingsId: string;
        amount: number;
        duration: string;
        startDate: string;
        newBalance: number;
    };
}

export interface GetSavingsResponse {
    success: boolean;
    data: {
        totalSavings: number;
        savingsHistory: SavingsPlan[];
    };
}