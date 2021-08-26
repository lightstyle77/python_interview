"""
Написать программу, которая запрашивает у пользователя ввод числа.
На введенное число она отвечает сообщением, целое оно или дробное.
Если дробное — необходимо далее выполнить сравнение чисел до и после запятой.
Если они совпадают, программа должна возвращать значение True, иначе False.
"""


def compare_parts(string):
    try:
        number = float(string)
        if int(number) == number:
            print('целое')
            return None
        else:
            print('дробное')
            left, right = string.split('.')
            return left == right
    except ValueError:
        print('Не число')


print(compare_parts(input('Введите число: ')))
