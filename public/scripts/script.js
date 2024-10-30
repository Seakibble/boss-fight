let $healthBars = document.getElementById('healthBars')
let $input = document.getElementById('input')
let $blackGradient = document.querySelector('.blackGradient')
let $portrait = document.getElementById('portrait')
let $messages = document.getElementById('messages')

// On pressing enter in the terminal, broadcast command to server.
$input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        socket.emit('command', $input.value)
    } else {
        $input.classList.remove('error')
    }
})

function command(cmd) {
    let data = cmd.split(' ')

    // Check that there's an id for commands that require an id
    if (!['victory','vic','reload','rel', 'add'].includes(data[0]) && bosses[data[1]] === undefined
        || data[0] == 'add' && bossTemplates[data[1]] === undefined) {
        $input.classList.add('error')
        return
    }

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
        case 'taunt':
            taunt(data[1])
            break
        case 'victory':
        case 'vic':
            showMessage('defeated')
            break
        case 'reload':
        case 'rel':
            reload()
            break
        case 'del':
        case 'delete':
            removeHealthBar(data[1])
            break
        case 'sethp':
        case 'hp':
            setHP(data[1], data[2])
        default:
            $input.classList.add('error')
    }
}

function reload() {
    location.reload()
}

let bosses = {}
function addHealthBar(id, name, hp) {
    if (bossTemplates[id]) {
        name = bossTemplates[id].name
        hp = bossTemplates[id].hp
    } else {
        name = name.replaceAll('_',' ')
    }

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
        el: $boss,
        state: STATE.NORMAL
    }

    setPortrait(id)
    updateBar(id)
    loadSFX(id)
    setBackground(id)

    if (Object.keys(bosses).length > 0) {
        $healthBars.classList.remove('hide')
        $blackGradient.classList.add('screenDown')
    }

    SFX[id].music.play()

    // Play intro line on appearing.
    setTimeout(() => {
        SFX[id].intro.play()
    }, 2000)
}

function removeHealthBar(id) {
    let boss = bosses[id]
    if (boss) {
        if (Object.keys(bosses).length === 1) {
            $healthBars.classList.add('hide')
            $blackGradient.classList.remove('screenDown')
        }
        setTimeout(()=>{
            setPortrait(id, null)
            unsetBackground(id)
            boss.el.remove()
            delete bosses[id]
        }, 2000)
    }
}

function setPortrait(id, state = undefined, duration = 0) {
    let boss = bosses[id]
    if (boss.hp === 0) {
        boss.state = STATE.DEAD
    } else if (boss.hp > boss.max / 2) {
        boss.state = STATE.NORMAL
    } else {
        boss.state = STATE.BLOODY
    }

    if (state === undefined) {
        state = boss.state
    }

    if (boss.hp <= 0) {
        $portrait.parentElement.classList.add('defeat')
    } else {
        $portrait.parentElement.classList.remove('defeat')
    }

    if (state === null) {
        $portrait.src = ''
        $portrait.parentElement.classList.remove('show')

    } else {
        $portrait.src = `data/${id}/images/${id}-${state}.png`
        $portrait.parentElement.classList.add('show')
    }

    // Resets to current state after duration
    if (duration > 0) {
        setTimeout(()=> {
            setPortrait(id)
        }, duration)
    }
}


function setBackground(id) {
    document.body.classList.add('bg-'+id)
}
function unsetBackground(id) {
    document.body.classList.remove('bg-'+id)
}

function setHP(id, hp) {
    let boss = bosses[id]
    boss.hp = hp
    updateBar(id)
    setPortrait(id)
}

function damage(id, amount = 0) {
    let boss = bosses[id]
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

    updateBar(id)
    SFX.damage.play()

    setPortrait(id, STATE.HURT, 300)

    if (boss.hp === 0) {
        setTimeout(() => {
            pick(SFX[id].defeat).play()
        }, 75)
        SFX[id].music.fade(0.25, 0, 4000)
    } else if (boss.hp < boss.max / 2 || amount > boss.max / 5) {
        setTimeout(() => {
            pick(SFX[id].panic).play()
        }, 75)
    } else {
        setTimeout(() => {
            pick(SFX[id].hurt).play()
        }, 75)
    }
}

function taunt(id) {
    let boss = bosses[id]
    let taunt = pick(SFX[id].taunt)
    taunt.play()
    console.log(taunt.duration())

    setPortrait(id, STATE.TAUNT, taunt.duration()*1000)

}

function giveTempHP(id, amount) {
    let boss = bosses[id]
    if (boss.temp < amount) {
        boss.temp = amount
    }

    updateBar(id)
    SFX.temp.play()
    setTimeout(() => {
        pick(SFX[id].taunt).play()
    }, 300)
}

function heal(id, amount) {
    let boss = bosses[id]
    boss.hp += amount
    if (boss.hp >= boss.max) {
        boss.hp = boss.max
        clearDamage(id)
    } else {
        let damage = boss.el.querySelector('.damageText').dataset.damage
        damage = parseInt(damage) - parseInt(amount)
        boss.el.querySelector('.damageText').innerHTML = damage
        boss.el.querySelector('.damageText').dataset.damage = damage        
    }
    
    boss.el.classList.add('healing')
    setTimeout(()=> {
        boss.el.classList.remove('healing')
    }, 5000)
    
    updateBar(id)
    SFX.heal.play()
    setTimeout(() => {
        pick(SFX[id].taunt).play()
    }, 300)

    setPortrait(id, STATE.HEAL, 5000)

    if (boss.hp > 0 && $portrait.parentElement.classList.contains('defeat')) {
        $portrait.parentElement.classList.remove('defeat')
        SFX[id].music.stop()
        SFX[id].music.volume(0.25)
        SFX[id].music.play()
    }
}

function clearDamage(id) {
    let boss = bosses[id]
    boss.el.querySelector('.damageText').innerHTML = ''
    boss.el.querySelector('.damageText').dataset.damage = 0
}

function updateBar(id) {
    let boss = bosses[id]
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

function showMessage(msg) {
    let $msg = $messages.querySelector('.' + msg)
    $msg.classList.add('show')
    SFX.victory.play()
    $msg.addEventListener('animationend', () => {
        $msg.classList.remove('show')
    }, true)
}


SFX = {}
SFX.damage = new Howl({
    src: ['data/general/sfx/sword-strike.mp3'],
    volume: 0.5,
    preload: true
})

SFX.heal = new Howl({
    src: ['data/general/sfx/heal.mp3'],
    volume: 0.5,
    preload: true
})

SFX.intro = new Howl({
    src: ['data/general/sfx/intro.mp3'],
    volume: 0.2,
    preload: true
})

SFX.temp = new Howl({
    src: ['data/general/sfx/temp.mp3'],
    volume: 0.5,
    preload: true
})

SFX.victory = new Howl({
    src: ['data/general/sfx/victory.mp3'],
    volume: 0.5,
    preload: true
})


function loadSFX(id) {
    SFX[id] = {}
    SFX[id].taunt = []
    for (let i = 1; i <= bossTemplates[id].sfx.taunt; i++) {
        SFX[id].taunt.push(new Howl({
            src: ['data/' + id +'/sfx/' + id +'-taunt-' + i + '.mp3'], volume: 1
        }))
    }

    SFX[id].defeat = []
    for (let i = 1; i <= bossTemplates[id].sfx.defeat; i++) {
        SFX[id].defeat.push(new Howl({
            src: ['data/' + id +'/sfx/' + id +'-defeat-' + i + '.mp3'], volume: 1
        }))
    }

    SFX[id].hurt = []
    for (let i = 1; i <= bossTemplates[id].sfx.hurt; i++) {
        SFX[id].hurt.push(new Howl({
            src: ['data/' + id +'/sfx/' + id +'-hurt-' + i + '.mp3'], volume: 0.75
        }))
    }

    SFX[id].panic = []
    for (let i = 1; i <= bossTemplates[id].sfx.panic; i++) {
        SFX[id].panic.push(new Howl({
            src: ['data/' + id +'/sfx/'+id+'-panic-' + i + '.mp3'], volume: 1
        }))
    }

    SFX[id].music = new Howl({
        src: ['data/' + id +'/sfx/'+id+'-music.mp3'],
        volume: 0.25,
        preload: true,
        loop: true
    })

    SFX[id].intro = new Howl({
        src: ['data/' + id + '/sfx/' + id + '-intro.mp3'],
        volume: 1,
        preload: true,
    })
}






function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}