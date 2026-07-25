class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self.observers = []
        self.history = []  # Transaction history stack

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Must be positive")

        self.__balance += amount
        self.history.append(f"+{amount} ETB")

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient balance")

        self.__balance -= amount
        self.history.append(f"-{amount} ETB")
        self.notify(f"-{amount} ETB")

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")

    # Observer methods
    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, event):
        for observer in self.observers:
            observer.update(event)

    # Stack (Undo)
    def undo_last(self):
        if self.history:
            transaction = self.history.pop()
            print("Removed transaction:", transaction)
        else:
            print("No transaction history.")


class SavingsAccount(Account):
    def __init__(self, owner, num, balance=0, rate=0.05):
        super().__init__(owner, num, balance)
        self.rate = rate

    def add_interest(self):
        self.deposit(self.balance * self.rate)

    def statement(self):
        print("Savings Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")
        print(f"Interest Rate: {self.rate}")


class CurrentAccount(Account):
    def __init__(self, owner, num, balance=0, od=1000):
        super().__init__(owner, num, balance)
        self.overdraft = od

    def statement(self):
        print("Current Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")
        print(f"Overdraft Limit: {self.overdraft}")


# Factory Pattern
class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        if kind == "current":
            return CurrentAccount(owner, number, balance)

        raise ValueError(f"Unknown type: {kind}")


# Observer Pattern
class SMSAlert:

    def update(self, event):
        print(f"[TeleBirr SMS] {event}")


class AuditLog:

    def update(self, event):
        print(f"[Log] {event}")


# Singleton Pattern
class BankConfig:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000

        return cls._instance


# Day 08 - Account Registry
class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.account_number] = account

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):
        for account in self.accounts.values():
            account.statement()
            print("----------------")

    # Sort accounts by balance
    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True
        )[:n]

    # Binary search by account number
    def find_by_number(self, number):

        accounts = sorted(
            self.accounts.values(),
            key=lambda account: account.account_number
        )

        left = 0
        right = len(accounts) - 1

        while left <= right:

            mid = (left + right) // 2

            if accounts[mid].account_number == number:
                return accounts[mid]

            elif accounts[mid].account_number < number:
                left = mid + 1

            else:
                right = mid - 1

        return None

    # Recursive total balance
    def total_transactions(self, accounts=None):

        if accounts is None:
            accounts = list(self.accounts.values())

        if len(accounts) == 0:
            return 0

        return accounts[0].balance + self.total_transactions(accounts[1:])


# -----------------------------
# Testing Day 08
# -----------------------------

config = BankConfig()

print("Interest Rate:", config.interest_rate)
print("Overdraft Limit:", config.overdraft_limit)

print("----------------")

registry = AccountRegistry()

acc1 = AccountFactory.create(
    "savings",
    "Almaz",
    "CBE-1",
    1500
)

acc2 = AccountFactory.create(
    "current",
    "Dawit",
    "CBE-2",
    2000
)

acc3 = AccountFactory.create(
    "savings",
    "Selam",
    "CBE-3",
    3500
)

acc1.subscribe(SMSAlert())
acc1.subscribe(AuditLog())

registry.add(acc1)
registry.add(acc2)
registry.add(acc3)

acc1.deposit(500)
acc1.withdraw(200)

print("Transaction History:")
print(acc1.history)

print("----------------")

registry.list_all()

print("----------------")

print("Find Account:")
found = registry.find("CBE-1")

if found:
    found.statement()

print("----------------")

acc1.undo_last()

print("History After Undo:")
print(acc1.history)

print("----------------")

print("Top 2 Accounts by Balance")

top_accounts = registry.top_by_balance(2)

for account in top_accounts:
    print(account.owner, "-", account.balance)

print("----------------")

print("Binary Search")

result = registry.find_by_number("CBE-2")

if result:
    result.statement()
else:
    print("Account not found")

print("----------------")

print("Recursive Total Balance")

print(registry.total_transactions())