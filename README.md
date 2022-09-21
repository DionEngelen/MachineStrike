## Project status
This project is not finished. It was meant to build an application from scratch and see how far I would progress up to three weeks.

# Individual Project

This is my individual project created as final product during my traineeship software engineering at Sogyo: software innovators. At the time my engineering experience was about four months. This project lasted for three weeks. Any unfinished business should not be finished, however, remarking unfinished features was part of the project in order to contemplate any further design choices. It is about a boardgame called Machine Strike. It contains a React front-end, and a Python back-end.

***

## Name
Machine Strike.

## Description
Machine Strike is an in-game side activity you can play in Horizon Forbidden West. More specifically, it is a turn-based 2-player board game. This repository contains the code trying to re-enact the original boardgame as it is seen in the actual game itself. In short, both players choose a set of board pieces with a maximum value of 10 points in total. Every piece is worth a particular amount of points, depending on the overall strength of the piece. For example, you can have five 2-points pieces or one 6-points piece together with a 4-points piece. When a piece is defeated, the opposing player acquires victorypoints, which are the points that piece is worth to begin with. The goal is to eliminate all strike pieces of your opponent or defeat enough of them to acquire at least 7 victorypoints. Every piece is a certain type and contains health, an attack value, an attack range, a movement range, armored spots, weak spots, and optionally an ability

My implementation is not finished yet. You can select players, choose a board, pick pieces and eventually start the game. While playing you can move the pieces, see beforehand their maximum movement range, and overload them (taking another turn once per piece per turn in exchange for some health). Afterwards, the active player will switch turns enabling the opposing player to the same. The pieces not belonging to the active player are blurred to indicate it s not that player's turn.
