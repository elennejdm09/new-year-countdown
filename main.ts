let _var = 0
let time: number[] = []
let list: number[] = []
let Adjust = false
let Secsleft = 0
let Minsleft = 0
let Hoursleft = 0
let daysleft = 0
let Restore = false
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
if (blockSettings.exists("Day")) {
    Restore = game.ask("Restore Data?")
    if (Restore) {
        daysleft = blockSettings.readNumber("Day")
        Hoursleft = blockSettings.readNumber("Hour")
        Minsleft = blockSettings.readNumber("Min")
        Secsleft = blockSettings.readNumber("Sec")
        Adjust = game.ask("Adjust Time?")
        if (Adjust) {
            daysleft += 0 - game.askForNumber("How many days have passed?")
            Hoursleft += 0 - game.askForNumber("How many hours have passed?")
            Minsleft += 0 - game.askForNumber("How many mins have passed?")
            Secsleft += 0 - game.askForNumber("How many secs have passed?")
        }
    } else {
        list = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
        ]
        time = [
        game.askForNumber("Month"),
        game.askForNumber("Day"),
        game.askForNumber("Hour-24 HOUR CLOCK"),
        game.askForNumber("Minute"),
        game.askForNumber("Second")
        ]
        daysleft = 0
        Hoursleft = 0
        Minsleft = 0
        Secsleft = 0
        for (let index = 0; index < time[0] - 1; index++) {
            daysleft += list[_var]
            _var += 1
        }
        daysleft += time[1]
        daysleft = 365 - daysleft
        Hoursleft = 24 - time[2]
        Minsleft = 60 - time[3]
        Secsleft = 60 - time[4]
        info.setScore(daysleft)
    }
} else {
    list = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
    ]
    time = [
    game.askForNumber("Month"),
    game.askForNumber("Day"),
    game.askForNumber("Hour-24 HOUR CLOCK"),
    game.askForNumber("Minute"),
    game.askForNumber("Second")
    ]
    daysleft = 0
    Hoursleft = 0
    Minsleft = 0
    Secsleft = 0
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    for (let index = 0; index < time[0] - 1; index++) {
        daysleft += list[_var]
        _var += 1
    }
    daysleft += time[1]
    daysleft = 365 - daysleft
    Hoursleft = 24 - time[2]
    Minsleft = 60 - time[3]
    Secsleft = 60 - time[4]
    info.setScore(daysleft)
}
game.onUpdateInterval(1000, function () {
    Secsleft += -1
})
forever(function () {
    mySprite.sayText("Days: " + daysleft + "     Hours: " + Hoursleft + "     Mins:" + Minsleft + "      Secs:" + Secsleft)
})
forever(function () {
    blockSettings.writeNumber("Day", daysleft)
    blockSettings.writeNumber("Hour", Hoursleft)
    blockSettings.writeNumber("Min", Minsleft)
    blockSettings.writeNumber("Sec", Secsleft)
    if (Secsleft == 0) {
        Secsleft = 60
        Minsleft += -1
    }
    if (Minsleft == 0) {
        Minsleft = 60
        Hoursleft += -1
    }
    if (Hoursleft == 0) {
        Hoursleft = 24
        daysleft += -1
    }
    if (daysleft == 0) {
        Hoursleft = 24
        daysleft = 364
    }
})
