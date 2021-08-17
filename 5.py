"""
Усовершенствовать программу «Банковский депозит».
Третьим аргументом в функцию должна передаваться фиксированная ежемесячная сумма пополнения вклада.
Необходимо в главной функции реализовать вложенную функцию подсчета процентов для пополняемой суммы.
Примем, что клиент вносит средства в последний день каждого месяца, кроме первого и последнего.
Например, при сроке вклада в 6 месяцев пополнение происходит в течение 4 месяцев.
Вложенная функция возвращает сумму дополнительно внесенных средств (с процентами),
а главная функция — общую сумму по вкладу на конец периода.
"""


def get_percent(amount, months):
    if months not in [6, 12, 24]:
        return False

    rates = (
        {'begin_sum': 1000, 'end_sum': 10000, 6: 5, 12: 6, 24: 5},
        {'begin_sum': 10000, 'end_sum': 100000, 6: 6, 12: 7, 24: 6.5},
        {'begin_sum': 100000, 'end_sum': 1000000, 6: 7, 12: 8, 24: 7.5},
    )

    for rate in rates:
        if rate['begin_sum'] <= amount < rate['end_sum']:
            return rate[months]

    return False


def deposit(amount, months):
    percent = get_percent(amount, months)
    if not percent:
        print('Нет подходящего тарифа')

    total = amount
    for month in range(months):
        profit = total * percent / 100 / 12
        total += profit

    print(round(total, 2))


def replenishment_deposit(amount, months, charge=0):
    percent = get_percent(amount, months)
    if not percent:
        print('Нет подходящего тарифа')

    total = amount
    for month in range(months):
        profit = total * percent / 100 / 12
        total += profit
        if month != 0 and month != months - 1:
            total += charge + charge * percent / 100 / 12

    print(round(total, 2))


deposit(10000, 24)
replenishment_deposit(10000, 24, 100)
