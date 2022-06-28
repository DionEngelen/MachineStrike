def check_obstacles(placeholder, current_tile, tile_destination, movement_range):
    tile_to_check = current_tile
    movement_left = movement_range
    occupied = placeholder
    if current_tile > tile_destination:
        if tile_destination + 1 == occupied\
        and tile_destination + 8 == occupied\
        and not tile_destination + 1 == tile_to_check\
        and not tile_destination + 8 == tile_to_check\
        and movement_range >= 2:
            return False
        if tile_to_check - 1 == occupied\
        and tile_to_check - 8 == occupied:
            return False
        if tile_to_check - 2 == occupied\
        and tile_to_check - 16 == occupied\
        and tile_to_check - 9 == occupied:
            return False
        stranded_tile = check_path_up(occupied, tile_to_check, tile_destination, movement_left)
        if not stranded_tile == tile_destination:
            return False
        return True
    else:
        if tile_destination - 1 == occupied\
        and tile_destination - 8 == occupied\
        and not tile_destination - 1 == tile_to_check\
        and not tile_destination - 8 == tile_to_check\
        and movement_range >= 2:
            return False
        if tile_to_check + 1 == occupied\
        and tile_to_check + 8 == occupied:
            return False
        if tile_to_check + 2 == occupied\
        and tile_to_check + 16 == occupied\
        and tile_to_check + 9 == occupied:
            return False
        stranded_tile = check_path_down(occupied, tile_to_check, tile_destination, movement_left)
        if not stranded_tile == tile_destination:
            return False
        return True





def check_path_up(occupied, tile_to_check, tile_destination, movement_left):
    while tile_to_check - 8 > tile_destination and movement_left > 0:
        tile_to_check -= 8
        if tile_to_check == occupied:
            check_path_zigzag_left(occupied, tile_to_check + 8, tile_destination, movement_left)
        movement_left -= 1
    if tile_to_check - 8 == tile_destination and movement_left > 0:
        return tile_destination
    if movement_left > 0:
        check_path_left(occupied, tile_to_check, tile_destination, movement_left)
    else:
        return tile_to_check

def check_path_left(occupied, tile_to_check, tile_destination, movement_left):
    while tile_to_check - 1 > tile_destination and movement_left > 0:
        tile_to_check -= 1
        if tile_to_check == occupied:
            check_path_zigzag_left(occupied, tile_to_check + 9, tile_destination, movement_left + 1)
        movement_left -= 1
    if tile_to_check - 1 == tile_destination and movement_left > 0:
        return tile_destination
    else:
        return tile_to_check

def check_path_zigzag_left(occupied, tile_to_check, tile_destination, movement_left):
    if tile_to_check - 1 > tile_destination:
        tile_to_check -= 1
        if tile_to_check == occupied:
            check_path_zigzag_left(occupied, tile_to_check + 9, tile_destination, movement_left + 1) 
        movement_left -= 1
        check_path_up(occupied, tile_to_check, tile_destination, movement_left)
    return tile_destination







def check_path_down(occupied, tile_to_check, tile_destination, movement_left):
    while tile_to_check + 8 < tile_destination and movement_left > 0:
        tile_to_check += 8
        if tile_to_check == occupied:
            check_path_zigzag_right(occupied, tile_to_check - 8, tile_destination, movement_left)
        movement_left -= 1
    if tile_to_check + 8 == tile_destination and movement_left > 0:
        return tile_destination
    if movement_left > 0:
        check_path_right(occupied, tile_to_check, tile_destination, movement_left)
    else:
        return tile_to_check

def check_path_right(occupied, tile_to_check, tile_destination, movement_left):
    while tile_to_check + 1 < tile_destination and movement_left > 0:
        tile_to_check += 1
        if tile_to_check == occupied:
            check_path_zigzag_right(occupied, tile_to_check - 9, tile_destination, movement_left + 1)
        movement_left -= 1
    if tile_to_check + 1 == tile_destination and movement_left > 0:
        return tile_destination
    else:
        return tile_to_check

def check_path_zigzag_right(occupied, tile_to_check, tile_destination, movement_left):
    if tile_to_check + 1 < tile_destination:
        tile_to_check += 1
        if tile_to_check == occupied:
            check_path_zigzag_right(occupied, tile_to_check - 9, tile_destination, movement_left + 1)
        movement_left -= 1
        check_path_down(occupied, tile_to_check, tile_destination, movement_left)
    return tile_destination