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


class CurrentAccount(Account):
    def __init__(self, owner, num, balance=0, od=1000):
        super().__init__(owner, num, balance)
        self.overdraft = od
        # Create a savings account
s = SavingsAccount("Selamawit", "1001", 1000)

print("Owner:", s.owner)
print("Balance:", s.balance)

s.deposit(500)
print("After deposit:", s.balance)

s.add_interest()
print("After interest:", s.balance)

# Create a current account
c = CurrentAccount("Abel", "1002", 2000)

c.withdraw(1000)
print("Current account balance:", c.balance)