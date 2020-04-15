import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Parmscreate {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];

    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): {} {
    this.getBalance();
    const data = { transactions: this.transactions, balance: this.balance };
    return data;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.map(transaction => {
      balance.income += transaction.type === 'income' ? transaction.value : 0;
      balance.outcome += transaction.type === 'outcome' ? transaction.value : 0;
      return balance;
    }, 0);

    balance.total += balance.income - balance.outcome;
    this.balance = balance;
    return this.balance;
  }

  public create({ title, type, value }: Parmscreate): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
