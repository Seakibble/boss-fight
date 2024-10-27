let $healthBars = document.getElementById('healthBars')
let $input = document.getElementById('input')
let $blackGradient = document.querySelector('.blackGradient')
let $portrait = document.getElementById('portrait')

$input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        // command($input.value)
        socket.emit('command', $input.value)
        document.activeElement.blur()
    }
})

function command(cmd) {
    let data = cmd.split(' ')

    switch (data[0]) {
        case 'dam':
            damage(data[1], data[2])
            break
        case 'heal':
            heal(data[1], parseInt(data[2]))
            break
        case 'temp':
            giveTempHP(data[1], parseInt(data[2]))
            break
        case 'add':
            addHealthBar(data[1], data[2], parseInt(data[3]))
            break
        case 'clear':
            clearDamage(data[1])
            break
    }
}

let bosses = {}

function addHealthBar(id, name, hp, img) {

    if (bossTemplates[id]) {
        name = bossTemplates[id].name
        hp = bossTemplates[id].hp
        img = bossTemplates[id].img
    }

    name = name.replaceAll('_',' ')
    let $boss = document.createElement('div')
    $boss.classList.add('bossHealthBar')
    $boss.innerHTML = `
<h2 class="name">${name}</h2>
<h3 class="damageText" data-damage=0></h3>
<h3 class="tempText"></h3>
<div class='healthBar'>
    <div class="hp"></div>
    <div class="hpGhost"></div>
</div>`
    
    $healthBars.appendChild($boss)

    bosses[id] = {
        hp: parseInt(hp),
        max: parseInt(hp),
        temp: 0,
        el: $boss
    }

    $portrait.src = 'images/'+img+'.png'

    updateBar(id)
    // SFX.intro.play()

    if (Object.keys(bosses).length > 0) {
        $blackGradient.classList.add('screenDown')
    }

    $portrait.classList.add('show')
    SFX.music.play()
}

function damage(name, amount) {
    let boss = bosses[name]
    boss.temp -= amount
    if (boss.temp < 0) {
        boss.hp += boss.temp
        boss.temp = 0
    }
    if (boss.hp < 0) boss.hp = 0

    let damage = boss.el.querySelector('.damageText').dataset.damage
    damage = parseInt(amount) + parseInt(damage)
    boss.el.querySelector('.damageText').innerHTML = damage
    boss.el.querySelector('.damageText').dataset.damage = damage

    updateBar(name)
    SFX.damage.play()

    $portrait.src = 'images/remigius-hurt.png'
    if (boss.hp === 0) {
        setTimeout(() => {
            pick(SFX.remDefeat).play()
        }, 75)
        SFX.music.stop()
    } else if (boss.hp < boss.max / 2 || amount > boss.max / 5) {
        setTimeout(() => {
            pick(SFX.remPanic).play()
        }, 75)
    } else {
        setTimeout(() => {
            pick(SFX.remHurt).play()
        }, 75)
    }
    setTimeout(() => {
        if (boss.hp === 0) {
            $portrait.src = 'images/remigius-defeated.png'
            $portrait.classList.add('defeat')
        } else if (boss.hp > boss.max / 2) {
            $portrait.src = 'images/remigius.png'
        } else {
            $portrait.src = 'images/remigius-bloody.png'
        }        
    }, 300)
}

function giveTempHP(name, amount) {
    let boss = bosses[name]
    boss.temp = amount

    updateBar(name)
    SFX.temp.play()
    setTimeout(() => {
        pick(SFX.remTaunt).play()
    }, 300)
}

function heal(name, amount) {
    let boss = bosses[name]
    boss.hp += amount
    if (boss.hp > boss.max) boss.hp = boss.max
    
    boss.el.classList.add('healing')
    setTimeout(()=> {
        boss.el.classList.remove('healing')
    }, 5000)

    let damage = boss.el.querySelector('.damageText').dataset.damage
    damage = parseInt(damage) - parseInt(amount)
    boss.el.querySelector('.damageText').innerHTML = damage
    boss.el.querySelector('.damageText').dataset.damage = damage
    
    updateBar(name)
    SFX.heal.play()
    setTimeout(() => {
        pick(SFX.remTaunt).play()
    }, 300)

    $portrait.src = 'images/remigius-heal.png'
    if (boss.hp > 0) {
        $portrait.classList.remove('defeat')
        if (!SFX.music.playing()) {
            SFX.music.play()
        }
    }
    setTimeout(() => {
        if (boss.hp > boss.max / 2) {
            $portrait.src = 'images/remigius.png'
        } else {
            $portrait.src = 'images/remigius-bloody.png'
        }
    }, 5000)
}

function clearDamage(name) {
    let boss = bosses[name]
    boss.el.querySelector('.damageText').innerHTML = ''
    boss.el.querySelector('.damageText').dataset.damage = 0
}

function updateBar(name) {
    let boss = bosses[name]
    let health = (boss.hp/boss.max*100) + '%'
    boss.el.querySelector('.hp').style.width = health
    boss.el.querySelector('.hpGhost').style.width = health

    if (boss.temp <= 0) {
        boss.el.classList.remove('shield')
    } else {
        boss.el.classList.add('shield')
        boss.el.querySelector('.tempText').innerHTML = boss.temp
        boss.el.querySelector('.tempText').classList.add('ping')
        setTimeout(()=> {
            boss.el.querySelector('.tempText').classList.remove('ping')
        }, 750)
    }
}


SFX = {}

SFX.damage = new Howl({
    src: ['sfx/sword-strike.mp3'],
    volume: 0.5,
    preload: true
})

SFX.heal = new Howl({
    src: ['sfx/heal.mp3'],
    volume: 0.5,
    preload: true
})

SFX.intro = new Howl({
    src: ['sfx/intro.mp3'],
    volume: 0.2,
    preload: true
})

SFX.temp = new Howl({
    src: ['sfx/temp.mp3'],
    volume: 0.5,
    preload: true
})

SFX.music = new Howl({
    src: ['sfx/remigius-music.mp3'],
    volume: 0.2,
    preload: true,
    loop: true
})

SFX.remTaunt = [
    new Howl({ src: ['sfx/rem-taunt-1.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-taunt-2.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-taunt-3.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-taunt-4.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-taunt-5.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-taunt-6.mp3'], volume: 0.5 }),
]

SFX.remDefeat = [
    new Howl({ src: ['sfx/rem-defeat-1.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-defeat-2.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-defeat-3.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-defeat-4.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-defeat-5.mp3'], volume: 0.5 }),
    new Howl({ src: ['sfx/rem-defeat-6.mp3'], volume: 0.5 }),
]

SFX.remHurt = [
    new Howl({
        src: ['sfx/rem-hurt-1.mp3'], volume: 0.5
    }),

    new Howl({
        src: ['sfx/rem-hurt-2.mp3'], volume: 0.5
    }),
    new Howl({
        src: ['sfx/rem-hurt-3.mp3'], volume: 0.5
    }),
]

SFX.remPanic = [
    new Howl({
        src: ['sfx/rem-panic-1.mp3'], volume: 1
    }),
    new Howl({
        src: ['sfx/rem-panic-2.mp3'], volume: 1
    }),
    new Howl({
        src: ['sfx/rem-panic-3.mp3'], volume: 1
    }),
    new Howl({
        src: ['sfx/rem-panic-4.mp3'], volume: 1
    }),
]

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}