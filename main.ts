namespace SpriteKind {
    export const ActivePlayer = SpriteKind.create()
    export const Melee = SpriteKind.create()
    export const InteractiveItem = SpriteKind.create()
    export const Boxes = SpriteKind.create()
    export const Follower = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`tile12`, function (sprite, location) {
    roomID = 1
    tiles.setCurrentTilemap(tilemap`Level1`)
    tiles.placeOnTile(activePlayer, tiles.getTileLocation(26, 7))
    tiles.placeOnTile(Follower2, tiles.getTileLocation(26, 8))
    for (let index = 0; index < 4; index++) {
        myImage = assets.image`Sprite_Slime`
        EnemySpawner(enemyList, myImage, 5, 30, 35)
    }
})
function UpdateAnim () {
    if (activePlayer.vx == 0 && activePlayer.vy == 0) {
        if (activePlayer == playerMiner) {
            animation.stopAnimation(animation.AnimationTypes.All, playerMiner)
            if (isRight) {
                playerMiner.setImage(assets.image`Sprite_Miner_Right`)
            } else if (isLeft) {
                playerMiner.setImage(assets.image`Sprite_Miner_Left`)
            } else if (isUp) {
                playerMiner.setImage(assets.image`Sprite_Miner_Forward`)
            } else if (isDown) {
                playerMiner.setImage(assets.image`Sprite_Miner_Backward`)
            }
        } else {
            animation.stopAnimation(animation.AnimationTypes.All, playerCat)
            if (isRight) {
                playerCat.setImage(assets.image`Sprite_Cat_Right`)
            } else if (isLeft) {
                playerCat.setImage(assets.image`Sprite_Cat_Left`)
            } else if (isUp) {
                playerCat.setImage(assets.image`Sprite_Cat_Forward`)
            } else if (isDown) {
                playerCat.setImage(assets.image`Sprite_Cat_Backward`)
            }
        }
    }
    if (!(isFollowing)) {
        if (Follower2 == playerMiner) {
            animation.stopAnimation(animation.AnimationTypes.All, playerMiner)
            if (isRight) {
                playerMiner.setImage(assets.image`Sprite_Miner_Right`)
            } else if (isLeft) {
                playerMiner.setImage(assets.image`Sprite_Miner_Left`)
            } else if (isUp) {
                playerMiner.setImage(assets.image`Sprite_Miner_Forward`)
            } else if (isDown) {
                playerMiner.setImage(assets.image`Sprite_Miner_Backward`)
            }
        } else {
            animation.stopAnimation(animation.AnimationTypes.All, playerCat)
            if (isRight) {
                playerCat.setImage(assets.image`Sprite_Cat_Right`)
            } else if (isLeft) {
                playerCat.setImage(assets.image`Sprite_Cat_Left`)
            } else if (isUp) {
                playerCat.setImage(assets.image`Sprite_Cat_Forward`)
            } else if (isDown) {
                playerCat.setImage(assets.image`Sprite_Cat_Backward`)
            }
        }
    }
}
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`myTile0`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    tiles.setCurrentTilemap(tilemap`Level1_Room2`)
    roomID = 2
    tiles.placeOnTile(activePlayer, tiles.getTileLocation(2, 28))
    tiles.placeOnTile(Follower2, tiles.getTileLocation(2, 29))
})
sprites.onOverlap(SpriteKind.Melee, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(2, 500)
    damagedEnemy = otherSprite
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, damagedEnemy).value += -1
})
function PlayerAttack () {
    Attack = sprites.create(assets.image`AttackEffect`, SpriteKind.Melee)
    Attack.lifespan = 200
    if (isLeft) {
        Attack.setPosition(activePlayer.x - 16, activePlayer.y)
    } else if (isRight) {
        Attack.setPosition(activePlayer.x + 16, activePlayer.y)
    } else if (isUp) {
        Attack.setPosition(activePlayer.x, activePlayer.y - 16)
    } else if (isDown) {
        Attack.setPosition(activePlayer.x, activePlayer.y + 16)
    }
}
// 初始朝向
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    isUp = true
    isDown = false
    isLeft = false
    isRight = false
    tryMoveBox(0, -1)
    animation.runImageAnimation(
    playerMiner,
    assets.animation`Anim_Miner_Forward`,
    120,
    true
    )
    animation.runImageAnimation(
    playerCat,
    assets.animation`Anim_Cat_Forward`,
    120,
    true
    )
})
scene.onOverlapTile(SpriteKind.Follower, assets.tile`tile14`, function (sprite, location) {
    if (Follower2 == playerMiner) {
        // 矿工：阻止通过
        tiles.placeOnTile(Follower2, tiles.getTileLocation(Follower2.tilemapLocation().column, Follower2.tilemapLocation().row + 1))
    }
})
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`Tile_Pickaxe`, function (sprite, location) {
    IsWeaponGet = true
    tiles.setTileAt(tiles.getTileLocation(13, 4), assets.tile`tile5`)
})
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`tile14`, function (sprite, location) {
    if (activePlayer == playerCat) {
        // 猫：允许通过，可加提示或效果
        console.log("猫通过通道")
    } else {
        // 矿工：阻止通过
        tiles.placeOnTile(activePlayer, tiles.getTileLocation(activePlayer.tilemapLocation().column, activePlayer.tilemapLocation().row + 1))
        game.showLongText("Miner can't pass.. It's too narrow.", DialogLayout.Bottom)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    isDown = true
    isLeft = false
    isRight = false
    isUp = false
    tryMoveBox(0, 1)
    animation.runImageAnimation(
    playerMiner,
    assets.animation`Anim_Miner_Backward`,
    120,
    true
    )
    animation.runImageAnimation(
    playerCat,
    assets.animation`Anim_Cat_Backward`,
    120,
    true
    )
})
function EnemyChasing (DistanceLimit: number) {
    for (let singleEnemy of enemyList) {
        dx3 = activePlayer.x - singleEnemy.x
        dy3 = activePlayer.y - singleEnemy.y
        ChasingDistance = Math.sqrt(dx3 * dx3 + dy3 * dy3)
        if (ChasingDistance < DistanceLimit) {
            singleEnemy.follow(activePlayer, 40)
            isEnemyChasing = true
        } else if (isEnemyChasing) {
            if (ChasingDistance > DistanceLimit) {
                singleEnemy.follow(null)
                isEnemyChasingStop = true
                isEnemyChasing = false
            }
        } else if (isEnemyChasingStop) {
            singleEnemy.setVelocity(randint(30, 40), randint(30, 40))
            isEnemyChasingStop = false
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (IsWeaponGet) {
        if (activePlayer == playerMiner) {
            PlayerAttack()
            Destory()
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isRight = true
    isDown = false
    isLeft = false
    isUp = false
    tryMoveBox(1, 0)
    animation.runImageAnimation(
    playerMiner,
    assets.animation`Anim_Miner_Right`,
    120,
    true
    )
    animation.runImageAnimation(
    playerCat,
    assets.animation`Anim_Cat_Right`,
    120,
    true
    )
})
function shootHomingBullet (shooter: Sprite, target: Sprite, speed: number) {
    bullet = sprites.createProjectileFromSprite(img`
        . . 5 . . 
        . 5 5 5 . 
        5 5 5 5 5 
        . 5 5 5 . 
        . . 5 . . 
        `, shooter, 0, 0)
    dx2 = target.x - shooter.x
    dy2 = target.y - shooter.y
    ChasingDistance = Math.sqrt(dx2 * dx2 + dy2 * dy2)
    // 单位向量方向 * speed
    bullet.vx = dx2 / ChasingDistance * speed
    bullet.vy = dy2 / ChasingDistance * speed
}
function Destory () {
    if (isLeft) {
        frontX = activePlayer.tilemapLocation().column - 1
        frontY = activePlayer.tilemapLocation().row
    } else if (isRight) {
        frontX = activePlayer.tilemapLocation().column + 1
        frontY = activePlayer.tilemapLocation().row
    } else if (isUp) {
        frontX = activePlayer.tilemapLocation().column
        frontY = activePlayer.tilemapLocation().row - 1
    } else if (isDown) {
        frontX = activePlayer.tilemapLocation().column
        frontY = activePlayer.tilemapLocation().row + 1
    }
    targetTile = tiles.getTileLocation(frontX, frontY)
    // 如果该 tile 是可破坏的，就替换为透明或地面
    if (tiles.tileAtLocationEquals(targetTile, assets.tile`tile4`)) {
        tiles.setTileAt(targetTile, assets.tile`tile5`)
        tiles.setWallAt(tiles.getTileLocation(frontX, frontY), false)
    } else if (tiles.tileAtLocationEquals(targetTile, assets.tile`Tile_Bottle`)) {
        tiles.setTileAt(targetTile, assets.tile`tile5`)
        info.changeScoreBy(10)
    }
}
sprites.onOverlap(SpriteKind.ActivePlayer, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (activePlayer == playerMiner) {
        scene.cameraShake(4, 500)
        info.changeLifeBy(-1)
        pause(1000)
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(damagedEnemy, effects.halo, 500)
    enemyList.removeAt(enemyList.indexOf(damagedEnemy))
})
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`myTile3`, function (sprite, location) {
    effects.confetti.startScreenEffect(2000)
    game.splash("Light... LightSaber?!")
    game.splash("Congrats! You find Guichard's Lightsaber")
})
function EnemySpawner (EnemyArr: Sprite[], SpriteImage: Image, HP: number, Vx: number, Vy: number) {
    enemy = sprites.create(SpriteImage, SpriteKind.Enemy)
    bar = statusbars.create(15, 3, StatusBarKind.EnemyHealth)
    bar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    bar.attachToSprite(enemy)
    bar.value = HP
    enemy.setVelocity(Vx, Vy)
    EnemyArr.push(enemy)
    tiles.placeOnRandomTile(enemy, assets.tile`FloorTile`)
    enemy.setBounceOnWall(true)
    animation.runImageAnimation(
    enemy,
    assets.animation`Anim_Slime0`,
    150,
    true
    )
}
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`myTile`, function (sprite, location) {
    if (!(hasTriggeredRock)) {
        hasTriggeredRock = true
        isRockChasing = true
        rock.setVelocity(0, 81)
    }
})
function tryMoveBox (dx: number, dy: number) {
    if (activePlayer != playerMiner) {
        return
    }
    playerLoc = activePlayer.tilemapLocation()
    front = tiles.getTileLocation(playerLoc.column + dx, playerLoc.row + dy)
    beyond = tiles.getTileLocation(playerLoc.column + dx * 2, playerLoc.row + dy * 2)
    if (tiles.tileAtLocationEquals(front, assets.tile`BoxTile`)) {
        // 前方是箱子，检查箱子前面是否可移动
        canPush = !(tiles.tileAtLocationEquals(beyond, assets.tile`WallTile`))
        if (canPush) {
            // 推箱子
            tiles.setTileAt(beyond, assets.tile`BoxTile`)
            tiles.setWallAt(beyond, true)
            tiles.setTileAt(front, assets.tile`tile5`)
            tiles.setWallAt(front, false)
            // 移动玩家
            tiles.placeOnTile(activePlayer, front)
        }
    }
}
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`tile11`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    enemyList = []
    tiles.setCurrentTilemap(tilemap`Level1_Room2`)
    roomID = 2
    tiles.placeOnTile(activePlayer, tiles.getTileLocation(2, 28))
    tiles.placeOnTile(Follower2, tiles.getTileLocation(2, 29))
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    scene.cameraFollowSprite(null)
    controller.moveSprite(activePlayer, 0, 0)
    if (activePlayer == playerMiner) {
        Follower2.follow(null)
        activePlayer = playerCat
        Follower2 = playerMiner
        playerCat.setKind(SpriteKind.ActivePlayer)
        playerMiner.setKind(SpriteKind.Follower)
        Follower2.follow(activePlayer, 60)
    } else {
        Follower2.follow(null)
        activePlayer = playerMiner
        Follower2 = playerCat
        playerMiner.setKind(SpriteKind.ActivePlayer)
        playerCat.setKind(SpriteKind.Follower)
        Follower2.follow(activePlayer, 60)
    }
    controller.moveSprite(activePlayer, 80, 80)
    scene.cameraFollowSprite(activePlayer)
})
function EnemyPatrol (column: number, row: number, offsetX: number, offsetY: number) {
    for (let indexPatrol = 0; indexPatrol <= enemyList.length - 1; indexPatrol++) {
        TargetEnemy = enemyList[indexPatrol]
        if (TargetEnemy.tilemapLocation().column >= column) {
            TargetEnemy.vx = 0 - TargetEnemy.vx
        } else if (TargetEnemy.tilemapLocation().row >= row) {
            TargetEnemy.vy = 0 - TargetEnemy.vy
        }
        if (TargetEnemy.tilemapLocation().column <= column - 3) {
            TargetEnemy.vx = 0 - TargetEnemy.vx
        } else if (TargetEnemy.tilemapLocation().row <= row - 3) {
            TargetEnemy.vy = 0 - TargetEnemy.vy
        }
    }
}
function shootCircleBullets (center: Sprite, count: number, speed: number) {
    for (let i = 0; i <= count - 1; i++) {
        angle = 360 / count * i
        bullet2 = sprites.createProjectileFromSprite(img`
            . . 2 . . 
            . 2 2 2 . 
            2 2 1 2 2 
            . 2 2 2 . 
            . . 2 . . 
            `, center, 0, 0)
        damagedEnemy.setScale(2, ScaleAnchor.Middle)
        bullet2.lifespan = 800
        bullet2.vx = speed * Math.cos(angle * Math.PI / 180)
        bullet2.vy = speed * Math.sin(angle * Math.PI / 180)
    }
}
sprites.onOverlap(SpriteKind.ActivePlayer, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    pause(1000)
})
function UpdateFollowing () {
    dx2 = activePlayer.x - Follower2.x
    dy2 = activePlayer.y - Follower2.y
    distance = Math.sqrt(dx2 * dx2 + dy2 * dy2)
    // 不重叠的最小距离
    minDistance = 20
    if (distance > minDistance) {
        Follower2.follow(activePlayer, 60)
        isFollowing = true
    } else {
        Follower2.follow(null)
        isFollowing = false
    }
}
scene.onOverlapTile(SpriteKind.ActivePlayer, assets.tile`ChannelTile`, function (sprite, location) {
    sprites.destroy(rock)
    roomID = 1
    tiles.setCurrentTilemap(tilemap`Level1`)
    tiles.placeOnTile(activePlayer, tiles.getTileLocation(6, 2))
    tiles.placeOnTile(Follower2, tiles.getTileLocation(6, 2))
    for (let index = 0; index < 4; index++) {
        myImage = assets.image`Sprite_Slime`
        EnemySpawner(enemyList, myImage, 5, randint(25, 40), randint(25, 40))
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    isLeft = true
    isDown = false
    isRight = false
    isUp = false
    tryMoveBox(-1, 0)
    animation.runImageAnimation(
    playerMiner,
    assets.animation`Anim_Miner_Left`,
    120,
    true
    )
    animation.runImageAnimation(
    playerCat,
    assets.animation`Anim_Cat_Left`,
    120,
    true
    )
})
let minDistance = 0
let distance = 0
let bullet2: Sprite = null
let angle = 0
let TargetEnemy: Sprite = null
let canPush = false
let beyond: tiles.Location = null
let front: tiles.Location = null
let playerLoc: tiles.Location = null
let isRockChasing = false
let bar: StatusBarSprite = null
let enemy: Sprite = null
let targetTile: tiles.Location = null
let frontY = 0
let frontX = 0
let dy2 = 0
let dx2 = 0
let bullet: Sprite = null
let isEnemyChasingStop = false
let isEnemyChasing = false
let ChasingDistance = 0
let dy3 = 0
let dx3 = 0
let IsWeaponGet = false
let Attack: Sprite = null
let damagedEnemy: Sprite = null
let isFollowing = false
let isDown = false
let isUp = false
let isLeft = false
let isRight = false
let enemyList: Sprite[] = []
let myImage: Image = null
let roomID = 0
let Follower2: Sprite = null
let rock: Sprite = null
let activePlayer: Sprite = null
let playerCat: Sprite = null
let playerMiner: Sprite = null
let hasTriggeredRock = false
let dy = 0
let dx = 0
let isBlocked = false
let enemyBarsList = statusbars.allOfKind(StatusBarKind.EnemyHealth)
hasTriggeredRock = false
playerMiner = sprites.create(assets.image`TEST`, SpriteKind.ActivePlayer)
playerCat = sprites.create(assets.image`Sprite_Cat_Backward`, SpriteKind.Follower)
activePlayer = playerMiner
rock = sprites.create(assets.image`Sprite_Rock`, SpriteKind.Enemy)
rock.setFlag(SpriteFlag.GhostThroughWalls, true)
info.setLife(5)
info.setScore(0)
controller.moveSprite(activePlayer, 80, 80)
scene.cameraFollowSprite(activePlayer)
playerCat.setScale(0.9, ScaleAnchor.Middle)
Follower2 = playerCat
Follower2.follow(activePlayer, 50)
tiles.setCurrentTilemap(tilemap`Level_Chasing`)
tiles.placeOnTile(activePlayer, tiles.getTileLocation(6, 4))
rock.changeScale(0.2, ScaleAnchor.Middle)
tiles.placeOnTile(rock, tiles.getTileLocation(6, 0))
game.onUpdate(function () {
    UpdateFollowing()
    UpdateAnim()
    if (isRockChasing) {
        isRockChasing = false
        game.splash("RUN")
        scene.cameraShake(3, 8500)
        rock.startEffect(effects.ashes, 500)
    }
    if (activePlayer.overlapsWith(rock)) {
        game.gameOver(false)
        game.reset()
    }
    if (enemyList.length != 0) {
        EnemyChasing(48)
    }
    if (roomID == 2) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(14, 10), assets.tile`BoxTile`) && tiles.tileAtLocationEquals(tiles.getTileLocation(9, 22), assets.tile`BoxTile`) && tiles.tileAtLocationEquals(tiles.getTileLocation(12, 10), assets.tile`BoxTile`)) {
            tiles.setTileAt(tiles.getTileLocation(13, 9), assets.tile`tile14`)
            tiles.setWallAt(tiles.getTileLocation(13, 9), false)
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (info.life() < 5) {
        info.changeLifeBy(1)
    }
})
game.onUpdateInterval(1000, function () {
    if (enemyList.length != 0) {
        for (let 值22 of enemyList) {
            dx3 = activePlayer.x - 值22.x
            dy3 = activePlayer.y - 值22.y
            ChasingDistance = Math.sqrt(dx3 * dx3 + dy3 * dy3)
            if (ChasingDistance < 48) {
                shootHomingBullet(值22, activePlayer, 30)
            }
        }
    }
})
