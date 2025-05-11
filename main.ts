namespace SpriteKind {
    export const ActivePlayer = SpriteKind.create()
}
// 初始朝向
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    isUp = true
    isDown = false
    isLeft = false
    isRight = false
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
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    isDown = true
    isLeft = false
    isRight = false
    isUp = false
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
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isRight = true
    isDown = false
    isLeft = false
    isUp = false
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    scene.cameraFollowSprite(null)
    controller.moveSprite(activePlayer, 0, 0)
    if (activePlayer == playerMiner) {
        Follower.follow(null)
        activePlayer = playerCat
        Follower = playerMiner
        Follower.follow(activePlayer, 60)
    } else {
        Follower.follow(null)
        activePlayer = playerMiner
        Follower = playerCat
        Follower.follow(activePlayer, 60)
    }
    controller.moveSprite(activePlayer, 80, 80)
    scene.cameraFollowSprite(activePlayer)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    isLeft = true
    isDown = false
    isRight = false
    isUp = false
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
let dy = 0
let dx = 0
let isRight = false
let isLeft = false
let isDown = false
let isUp = false
let Follower: Sprite = null
let activePlayer: Sprite = null
let playerCat: Sprite = null
let playerMiner: Sprite = null
playerMiner = sprites.create(assets.image`TEST`, SpriteKind.Player)
playerCat = sprites.create(assets.image`Sprite_Cat_Backward`, SpriteKind.Player)
activePlayer = playerMiner
controller.moveSprite(activePlayer, 80, 80)
scene.cameraFollowSprite(activePlayer)
playerCat.setScale(0.9, ScaleAnchor.Middle)
Follower = playerCat
Follower.follow(activePlayer, 50)
tiles.placeOnTile(activePlayer, tiles.getTileLocation(2, 2))
tiles.setCurrentTilemap(tilemap`级别`)
game.onUpdate(function () {
    if (activePlayer.vx == 0) {
        if (activePlayer.vy == 0) {
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
    }
    dx = activePlayer.x - Follower.x
    dy = activePlayer.y - Follower.y
    distance = Math.sqrt(dx * dx + dy * dy)
    // 不重叠的最小距离
    minDistance = 20
    if (distance > minDistance) {
        Follower.follow(activePlayer, 60)
    } else {
        Follower.follow(null)
    }
})
