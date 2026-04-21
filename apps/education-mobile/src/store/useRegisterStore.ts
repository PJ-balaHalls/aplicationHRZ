import { create } from 'zustand';

export type AccountType = 'education' | 'individual' | 'enterprise';

export interface RegisterPayload {
  horizionId: string;
  email: string;
  firstName: string;
  lastName: string;
  document: string; // CPF ou Passaporte
  accountType: AccountType;
  consentAgreed: boolean;
}

interface RegisterState {
  payload: RegisterPayload;
  isSubmitting: boolean;
  error: string | null;
  updateField: <K extends keyof RegisterPayload>(field: K, value: RegisterPayload[K]) => void;
  submitRegistration: () => Promise<boolean>;
  reset: () => void;
}

const initialState: RegisterPayload = {
  horizionId: '', email: '', firstName: '', lastName: '', document: '', accountType: 'education', consentAgreed: false
};

export const useRegisterStore = create<RegisterState>((set, get) => ({
  payload: initialState,
  isSubmitting: false,
  error: null,
  updateField: (field, value) => set((state) => ({ 
    payload: { ...state.payload, [field]: value },
    error: null // limpa erro ao digitar
  })),
  submitRegistration: async () => {
    const { payload } = get();
    set({ isSubmitting: true, error: null });
    
    try {
      // ZERO TRUST: Call API Gateway para validação e inserção na Engine Supabase Core
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/account/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Erro de sincronização. Tente novamente.');
      }

      set({ isSubmitting: false });
      return true; // Sucesso, permite transição de cena
    } catch (err: any) {
      set({ isSubmitting: false, error: err.message });
      return false;
    }
  },
  reset: () => set({ payload: initialState, isSubmitting: false, error: null })
}));