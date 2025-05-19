// Utils and constants for Savings
import { SavingsPlan } from "../types/savingsTypes";

// Format currency
export const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString()}`;
};

// Calculate days remaining for a savings plan
export const calculateDaysRemaining = (plan: SavingsPlan): number => {
    const startDate = new Date(plan.startDate);
    const today = new Date();

    // Calculate end date based on duration
    const endDate = new Date(startDate);

    switch (plan.duration) {
        case '7days':
            endDate.setDate(startDate.getDate() + 7);
            break;
        case '14days':
            endDate.setDate(startDate.getDate() + 14);
            break;
        case '21days':
            endDate.setDate(startDate.getDate() + 21);
            break;
        case '30days':
            endDate.setDate(startDate.getDate() + 30);
            break;
        case '3months':
            endDate.setMonth(startDate.getMonth() + 3);
            break;
        case '6months':
            endDate.setMonth(startDate.getMonth() + 6);
            break;
        case '12months':
            endDate.setMonth(startDate.getMonth() + 12);
            break;
        default:
            return 0;
    }

    // Calculate days remaining
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
};

// Calculate progress percentage
export const calculateProgress = (plan: SavingsPlan): number => {
    const startDate = new Date(plan.startDate);
    const today = new Date();

    // Calculate total days for the plan
    let totalDays = 0;

    switch (plan.duration) {
        case '7days':
            totalDays = 7;
            break;
        case '14days':
            totalDays = 14;
            break;
        case '21days':
            totalDays = 21;
            break;
        case '30days':
            totalDays = 30;
            break;
        case '3months':
            totalDays = 90;
            break;
        case '6months':
            totalDays = 180;
            break;
        case '12months':
            totalDays = 365;
            break;
        default:
            return 0;
    }

    // Calculate days elapsed
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    // Calculate progress percentage
    const progress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));

    return progress;
};

// Format duration for display
export const formatDuration = (duration: string): string => {
    switch (duration) {
        case '7days':
            return '7 Days';
        case '14days':
            return '14 Days';
        case '21days':
            return '21 Days';
        case '30days':
            return '30 Days';
        case '3months':
            return '3 Months';
        case '6months':
            return '6 Months';
        case '12months':
            return '12 Months';
        default:
            return duration;
    }
};

// Constants
export const SAVINGS_DURATIONS = [
    { value: '7days', label: '7 Days', interest: '2%' },
    { value: '14days', label: '14 Days', interest: '3%' },
    { value: '21days', label: '21 Days', interest: '4%' },
    { value: '30days', label: '30 Days', interest: '5%' },
    { value: '3months', label: '3 Months', interest: '7%' },
    { value: '6months', label: '6 Months', interest: '8%' },
    { value: '12months', label: '12 Months', interest: '9%' }
];

export const CONTRIBUTION_FREQUENCIES = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
];

export const CONTRIBUTION_METHODS = [
    { value: 'automatic', label: 'Automatically' },
    { value: 'manual', label: 'Manually' }
];