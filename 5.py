"""
Реализовать расчет цены товара со скидкой.
Величина скидки должна передаваться в качестве аргумента в дочерний класс.
Выполнить перегрузку методов конструктора дочернего класса
(метод __init__, в который должна передаваться переменная — скидка),
и перегрузку метода __str__ дочернего класса. В этом методе должна пересчитываться
цена и возвращаться результат — цена товара со скидкой. Чтобы все работало корректно,
не забудьте инициализировать дочерний и родительский классы
(вторая и третья строка после объявления дочернего класса).
"""


class ItemDiscount:
    def __init__(self, name, price):
        self.name = name
        self.price = price


class ItemDiscountReport(ItemDiscount):
    def __init__(self, name, price, discount):
        super().__init__(name, price)
        self.discount = discount

    def __str__(self):
        return f'{self.name} {self.price - self.discount}'


child = ItemDiscountReport('sale', 10, 1)
print(child)
