export type PokeInfo = {
    name: string;
    url: string;
};

export type CatInfo = {
    fact: string;
    length: number;
}

export type SignInProps = {
    signature: string;
    nonce: string;
    public_address: string;
    chain_id: number;
}