import medias as m
import os
import pickle as p

book1 = m.Fiction("Harry Potter 1", "1997", "J.K. Rowling", False, "Shelf 1", "Bloomsbury", "Fantasy")

def main():
    while True:
        os.system("cls")
        choice = input("What would you like to do?\nAdd media       (1)   (Admin access required)\nLook in library  (2)\n")
        if choice == "1":
            admin()
        elif choice == "2":
            library()
        else:
            input("Sorry, that is not a valid choice, please try again")

def admin():
    os.system("cls")
    input("What would you like to add?\n")

def library():
    while True:
        os.system("cls")
        choice = input("What are you looking for?\nBooks   (1)\nMovies   (2)\nAudiobooks   (3)")
        if choice == "1":
            pass
        elif choice == "2":
            pass
        elif choice =="3":
            pass
        else:
            input("Sorry, that is not a valid choice, please try again")
main()