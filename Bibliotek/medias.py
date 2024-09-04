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

class Fiction(Book):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, publisher: str, genre: str):
        super().__init__(title, year, creator, borrowed, place, publisher)
        self.genre = genre

class NonFiction(Book):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, publisher: str, subject: str):
        super().__init__(title, year, creator, borrowed, place, publisher)
        self.subject = subject

class FictionMovie(Movie):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, director: str, genre: str):
        super().__init__(title, year, creator, borrowed, place, director)
        self.genre = genre

class NonFictionMovie(Movie):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, director: str, subject: str):
        super().__init__(title, year, creator, borrowed, place, director)
        self.subject = subject

class FictionAudioBook(AudioBook):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, reader: str, genre: str):
        super().__init__(title, year, creator, borrowed, place, reader)
        self.genre = genre
    
class NonFictionAudioBook(AudioBook):
    def __init__(self, title: str, year: str, creator: str, borrowed: bool, place: str, reader: str, subject: str):
        super().__init__(title, year, creator, borrowed, place, reader)
        self.subject = subject