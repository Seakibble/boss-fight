let $healthBars = document.getElementById('healthBars')
let $input = document.getElementById('input')
let $blackGradient = document.querySelector('.blackGradient')
let $portrait = document.getElementById('portrait')

$input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        let data = $input.value.split(' ')
        
        switch (data[0]) {
            case 'dam':
                damage(data[1], data[2]);
                break;
            case 'heal':
                heal(data[1], parseInt(data[2]));
                break;
            case 'temp':
                giveTempHP(data[1], parseInt(data[2]));
                break;
            case 'add':
                addHealthBar(data[1], data[2], parseInt(data[3]));
                break;
            case 'clear':
                clearDamage(data[1]);
                break;
        }
        
    }
})

let bosses = {}

function addHealthBar(id, name, hp) {
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
        hp: hp,
        max: hp,
        temp: 0,
        el: $boss
    }

    updateBar(id)

    if (Object.keys(bosses).length > 0) {
        $blackGradient.classList.add('screenDown')
    }

    $portrait.classList.add('show')
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
}

function giveTempHP(name, amount) {
    let boss = bosses[name]
    boss.temp = amount

    updateBar(name)
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

// addHealthBar('rem', 'Remigius of Tenmir', 60)