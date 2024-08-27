class Media:
    def __init__(self, title : str, year : str, creator : str, borrowed : bool, place : str):
        self.title = title
        self.year = year
        self.creator = creator
        self.borrowed = borrowed
        self.place = place

class Book(Media):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, publisher : str):
        super().__init__(title, year, creator, borrowed, place)
        self.publisher = publisher

class Movie(Media):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, director : str):
        super().__init__(title, year, creator, borrowed, place)
        self.director = director

class AudioBook(Media):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, reader : str):
        super().__init__(title, year, creator, borrowed, place)
        self.reader = reader