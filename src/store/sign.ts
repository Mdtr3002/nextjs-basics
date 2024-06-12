import { SignInProps } from '@/types'
import { create } from 'zustand'

type SignStoreProps = {
    isSignModalOpen: boolean;
    public_address: string;
    signature: string;
    nonce: string;
    chain_id: number;
    setSignInformation: (value: SignInProps) => void;
    setSignModalOpen: (value: boolean) => void;
}

export const useSignStore = create<SignStoreProps>((set) => ({
    isSignModalOpen: false,
    public_address: '',
    signature: '',
    nonce: '',
    chain_id: 1,
    setSignInformation: (value: SignInProps) => set(() => ({ 
        address: value.public_address,
        signature: value.signature,
        nonce: value.nonce,
        chain_id: value.chain_id,
     })),
    setSignModalOpen: (value: boolean) => set(() => ({ isSignModalOpen: value })),
}))