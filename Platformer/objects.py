import pygame
from pygame.locals import *

HEIGHT = 650
WIDTH = 800
ACC = 0.5
FRIC = -0.12
vec = pygame.math.Vector2

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__() 
        self.surf = pygame.Surface((30, 30))
        self.surf.fill((128,255,40))
        self.rect = self.surf.get_rect(center = (10, 420))

        self.pos = vec((50, 385))
        self.vel = vec(0,0)
        self.acc = vec(0,0)

    def move(self):
        self.acc = vec(0,0.5)
    
        pressed_keys = pygame.key.get_pressed()
                
        if pressed_keys[K_LEFT]:
            self.acc.x = -ACC
        if pressed_keys[K_RIGHT]:
            self.acc.x = ACC 

        self.acc.x += self.vel.x * FRIC
        self.vel += self.acc
        self.pos += self.vel + 0.5 * self.acc
            
        self.rect.midbottom = self.pos

    def jump(self):
        hits = pygame.sprite.spritecollide(self, platforms, False)
        if hits:
            self.vel.y =- 10

    def update(self):
        hits = pygame.sprite.spritecollide(P1 , platforms, False)
        if hits:
            self.vel.y = 0
            self.pos.y = hits[0].rect.top + 1
        
 
class platform(pygame.sprite.Sprite):
    def __init__(self, pl_width, pl_height, pl_y, pl_x):
        super().__init__()
        self.surf = pygame.Surface((pl_width, pl_height))
        self.surf.fill((255,0,0))
        self.rect = self.surf.get_rect(center = (pl_x, pl_y))
 
PT1 = platform(pl_width = 800, pl_height = 20, pl_x = WIDTH/2, pl_y = HEIGHT -10)
PT2 = platform(pl_width=100, pl_height=20, pl_x=500, pl_y=HEIGHT - 30)
PT3 = platform(pl_width=500, pl_height=20, pl_x=1000, pl_y=HEIGHT - 60)
plats = [PT1,PT2,PT3]
P1 = Player()
platforms = pygame.sprite.Group()
for i in plats:
    platforms.add(i)