import { Entity, Column, ManyToOne } from "typeorm";
import { Wallet } from "./wallet.entity";
import Model from "./Model";
import { User } from "./User";

export enum TransactionEnumType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
    TRANSFER = "transfer",
}

@Entity("transactions")
export class Transaction extends Model {
    @ManyToOne(() => Wallet, (wallet) => wallet.outgoingTransactions)
    senderWallet: Wallet;

    @ManyToOne(() => Wallet, (wallet) => wallet.incomingTransactions)
    receiverWallet: Wallet;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: "enum",
        enum: TransactionEnumType,
        default: TransactionEnumType.DEPOSIT,
    })
    type: string;

    @ManyToOne(() => User, (user) => user.transactions)
    user: User;
}
