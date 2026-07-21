class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self.observers = []

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient balance")

        self.__balance -= amount
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


# Testing Day 06

config = BankConfig()

print("Interest Rate:", config.interest_rate)
print("Overdraft Limit:", config.overdraft_limit)

print("----------------")

acc = AccountFactory.create(
    "current",
    "Dawit",
    "CBE-2",
    5000
)

acc.subscribe(SMSAlert())
acc.subscribe(AuditLog())

acc.statement()

print("----------------")

acc.withdraw(5000)