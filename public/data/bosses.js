const STATE = Object.freeze({
    NORMAL: 'normal',
    BLOODY: 'bloody',
    HURT: 'hurt',
    HEAL: 'heal',
    DEAD: 'defeated',
    TAUNT: 'taunt'
})

const bossTemplates = {
    rem: {
        name: 'Remigius of Tenmir',
        id: 'rem',
        hp: 60,
        sfx: {
            defeat: 6,
            taunt: 8,
            panic: 4,
            hurt: 6,
        },
        bg: 0
    },
    lil: {
        name: 'Empress Liliana Ankane I',
        id: 'lil',
        hp: 200,
        sfx: {
            defeat: 1,
            taunt: 5,
            panic: 3,
            hurt: 3,
        },
        bg: 1
    }
}