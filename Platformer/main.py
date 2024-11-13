import pygame
from pygame.locals import *
import objects
import sys

pygame.init()
vec = pygame.math.Vector2

HEIGHT = 650
WIDTH = 800
ACC = 0.5
FRIC = -0.12
FPS = 60

x_offset = 50

FramePerSec = pygame.time.Clock()
displaysurface = pygame.display.set_mode((WIDTH, HEIGHT))

pygame.display.set_caption("Game")

all_sprites = pygame.sprite.Group()
all_sprites.add(objects.PT1)
all_sprites.add(objects.PT2)
all_sprites.add(objects.PT3)
all_sprites.add(objects.P1)

while True:

    x_offset = objects.P1.pos.x - 400
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:    
            if event.key == pygame.K_UP:
                objects.P1.jump()
     
    displaysurface.fill((0,0,0))
 
    objects.P1.move()
    objects.P1.update()
    
    for entity in all_sprites:
        displaysurface.blit(entity.surf, pygame.Rect(entity.rect.left - x_offset, entity.rect.top, entity.rect.width, entity.rect.height))
 
    pygame.display.update()
    FramePerSec.tick(FPS)