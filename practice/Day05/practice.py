class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Must be positive")
        self.__balance += amount
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")

# First Run
acc = Account("Almaz", "CBE-1001", 1500)

acc.deposit(500)

print(acc.balance)
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
        # Polymorphism Example

bank = [
    SavingsAccount("Almaz", "CBE-1", 1500),
    CurrentAccount("Dawit", "CBE-2", 800),
]

for acc in bank:
    acc.deposit(100)
    acc.statement()
    print("----------------")