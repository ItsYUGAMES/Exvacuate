namespace SpriteKind {
    export const ActivePlayer = SpriteKind.create()
    export const Melee = SpriteKind.create()
    export const InteractiveItem = SpriteKind.create()
    export const Boxes = SpriteKind.create()
    export const Follower = SpriteKind.create()
}
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
sprites.onOverlap(SpriteKind.Melee, SpriteKind.Enemy, function (sprite, otherSprite) {
    bar.value += -1
})
function PlayerAttack () {
    Attack = sprites.create(img`
        . . . . . . 3 3 . . . . . . . . 
        . . . . . . 3 1 3 . . . . . . . 
        . . 3 3 . . 3 1 3 . . 3 3 . . . 
        . . 3 1 3 . 3 1 3 2 3 1 3 . . . 
        . . . 3 1 3 3 1 3 2 1 3 . . . . 
        3 3 3 3 2 1 3 1 1 1 3 . . . . . 
        3 1 1 1 1 1 1 1 1 2 3 3 3 3 3 3 
        . 3 3 3 2 3 1 1 1 1 1 1 1 1 1 3 
        . . . . . 2 1 1 1 3 3 2 3 3 3 . 
        . . . . 3 1 3 1 3 1 2 . . . . . 
        . . . 3 1 3 2 1 3 3 1 3 . . . . 
        . . 3 1 3 . 2 1 3 . 3 1 3 . . . 
        . . 3 3 . . 3 1 3 . . 3 3 . . . 
        . . . . . . 3 1 3 . . . . . . . 
        . . . . . . 3 1 3 . . . . . . . 
        . . . . . . 3 3 . . . . . . . . 
        `, SpriteKind.Melee)
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    if (!(hasTriggeredChase)) {
        hasTriggeredChase = true
        isChasing = true
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (activePlayer == playerMiner) {
        PlayerAttack()
        Destory()
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
    len = Math.sqrt(dx2 * dx2 + dy2 * dy2)
    // 单位向量方向 * speed
    bullet.vx = dx2 / len * speed
    bullet.vy = dy2 / len * speed
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
    if (tiles.tileAtLocationEquals(targetTile, sprites.dungeon.floorLight0)) {
        tiles.setTileAt(targetTile, assets.tile`transparency16`)
        tiles.setWallAt(tiles.getTileLocation(frontX, frontY), false)
    }
}
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(bar.spriteAttachedTo(), effects.halo, 500)
    enemyBarsList.removeAt(0)
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
        canPush = tiles.tileAtLocationEquals(beyond, assets.tile`transparency16`)
        if (canPush) {
            // 推箱子
            tiles.setTileAt(beyond, assets.tile`BoxTile`)
            tiles.setWallAt(beyond, true)
            tiles.setTileAt(front, assets.tile`transparency16`)
            tiles.setWallAt(front, false)
            // 移动玩家
            tiles.placeOnTile(activePlayer, front)
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    scene.cameraFollowSprite(null)
    controller.moveSprite(activePlayer, 0, 0)
    if (activePlayer == playerMiner) {
        Follower2.follow(null)
        activePlayer = playerCat
        Follower2 = playerMiner
        playerCat.setKind(SpriteKind.Player)
        playerMiner.setKind(SpriteKind.Player)
        Follower2.follow(activePlayer, 60)
    } else {
        Follower2.follow(null)
        activePlayer = playerMiner
        Follower2 = playerCat
        playerMiner.setKind(SpriteKind.Player)
        playerCat.setKind(SpriteKind.Player)
        Follower2.follow(activePlayer, 60)
    }
    controller.moveSprite(activePlayer, 80, 80)
    scene.cameraFollowSprite(activePlayer)
})
function EnemyPatrol (column: number, row: number, Enemy: Sprite) {
    if (Enemy.tilemapLocation().column > column) {
        Enemy.vx = 0 - Enemy.vx
    } else if (Enemy.tilemapLocation().row > row) {
        Enemy.vy = 0 - Enemy.vy
    }
    if (Enemy.tilemapLocation().column < column - 3) {
        Enemy.vx = 0 - Enemy.vx
    } else if (Enemy.tilemapLocation().row < row - 3) {
        Enemy.vy = 0 - Enemy.vy
    }
}
function shootCircleBullets (center: Sprite, count: number, speed: number) {
    for (let i = 0; i <= count - 1; i++) {
        angle = 360 / count * i
        bullet2 = sprites.createProjectileFromSprite(img`
            . . 5 . . 
            . 5 5 5 . 
            5 5 5 5 5 
            . 5 5 5 . 
            . . 5 . . 
            `, center, 0, 0)
        bullet2.vx = speed * Math.cos(angle * Math.PI / 180)
        bullet2.vy = speed * Math.sin(angle * Math.PI / 180)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tilePath1, function (sprite, location) {
	
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
function spawnEnemy (spawnLoc: tiles.Location, hp: number) {
    let enemyList: Sprite[] = []
    enemy = sprites.create(assets.image`Sprite_Slime`, SpriteKind.Enemy)
    tiles.placeOnTile(enemy, spawnLoc)
    bar = statusbars.create(15, 3, StatusBarKind.EnemyHealth)
    bar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    bar.attachToSprite(enemy)
    bar.value = hp
    enemyList.push(enemy)
    enemyBarsList.push(bar)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`transparency16`, function (sprite, location) {
	
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
let enemy: Sprite = null
let minDistance = 0
let distance = 0
let bullet2: Sprite = null
let angle = 0
let canPush = false
let beyond: tiles.Location = null
let front: tiles.Location = null
let playerLoc: tiles.Location = null
let targetTile: tiles.Location = null
let frontY = 0
let frontX = 0
let len = 0
let dy2 = 0
let dx2 = 0
let bullet: Sprite = null
let isChasing = false
let Attack: Sprite = null
let bar: StatusBarSprite = null
let isFollowing = false
let isDown = false
let isUp = false
let isLeft = false
let isRight = false
let Follower2: Sprite = null
let activePlayer: Sprite = null
let playerCat: Sprite = null
let playerMiner: Sprite = null
let hasTriggeredChase = false
let enemyBarsList: StatusBarSprite[] = []
let Enemys = null
let isBlocked = false
let dx = 0
let dy = 0
enemyBarsList = statusbars.allOfKind(StatusBarKind.EnemyHealth)
hasTriggeredChase = false
playerMiner = sprites.create(assets.image`TEST`, SpriteKind.ActivePlayer)
playerCat = sprites.create(assets.image`Sprite_Cat_Backward`, SpriteKind.Follower)
activePlayer = playerMiner
controller.moveSprite(activePlayer, 80, 80)
scene.cameraFollowSprite(activePlayer)
playerCat.setScale(0.9, ScaleAnchor.Middle)
Follower2 = playerCat
Follower2.follow(activePlayer, 50)
tiles.placeOnTile(activePlayer, tiles.getTileLocation(2, 2))
tiles.setCurrentTilemap(tilemap`级别`)
game.onUpdate(function () {
    UpdateFollowing()
    UpdateAnim()
    if (isChasing) {
        isChasing = false
        game.splash("RUN")
        scene.cameraShake(3, 5000)
    }
})
