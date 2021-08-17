"""
Дополнить следующую функцию недостающим кодом:
def print_directory_contents(sPath):
Функция принимает имя каталога и распечатывает его содержимое
в виде «путь и имя файла», а также любые другие
файлы во вложенных каталогах.
Эта функция подобна os.walk. Использовать функцию os.walk
нельзя. Данная задача показывает ваше умение работать с
вложенными структурами.
# заполните далее
"""
import os


def print_directory_contents(sPath):
    def print_directory_contents(sPath):
        for sChild in os.listdir(sPath):
            sChildPath = os.path.join(sPath, sChild)
            if os.path.isdir(sChildPath):
                print_directory_contents(sChildPath)
            else:
                print(sChildPath)
