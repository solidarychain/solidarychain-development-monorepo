import { GenericBalance } from '.';
export declare class Goods {
    id: string;
    code: string;
    barCode: string;
    name: string;
    description: string;
    tags: string[];
    balance?: GenericBalance;
    metaData: any;
    metaDataInternal: any;
    createdDate: number;
    createdByPersonId: string;
}
