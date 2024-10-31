const bgs = {
    0: `<style>
        #vLine { animation: bgAnimateLeft 10s infinite linear; }
        #hLine { animation: bgAnimateDown 30s infinite linear; }

        @keyframes bgAnimateLeft { from { transform: translateX(10px); } }
        @keyframes bgAnimateDown { from { transform: translateY(-10px); } }
    </style>
    <svg id='bg-0' width='100%' height='100%' viewbox="0 0 140 140">
        <defs>
            <rect id="vLine" class='line' width="5" height="300" y="-100" fill="#205" />
            <rect id="hLine" class='line' width="300" height="5" x="-100" fill="#205" />
        </defs>
        <rect class="bg" width="400" height="400" x="-150" y="-150" fill="#103" />
        <g id='hLines' transform="rotate(-20)">
            <use xlink:href="#hLine" y="0 "/>
            <use xlink:href="#hLine" y="10" />
            <use xlink:href="#hLine" y="20" />
            <use xlink:href="#hLine" y="30" />
            <use xlink:href="#hLine" y="40" />
            <use xlink:href="#hLine" y="50" />
            <use xlink:href="#hLine" y="60" />
            <use xlink:href="#hLine" y="70" />
            <use xlink:href="#hLine" y="80" />
            <use xlink:href="#hLine" y="90" />
            <use xlink:href="#hLine" y="100" />
            <use xlink:href="#hLine" y="110" />
            <use xlink:href="#hLine" y="120" />
            <use xlink:href="#hLine" y="130" />
            <use xlink:href="#hLine" y="140" />
            <use xlink:href="#hLine" y="150" />
            <use xlink:href="#hLine" y="160" />
            <use xlink:href="#hLine" y="170" />
            <use xlink:href="#hLine" y="180" />
            <use xlink:href="#hLine" y="190" />
        </g>
        <g id='vLines'>
            <use xlink:href="#vLine" x="-20" />
            <use xlink:href="#vLine" x="-10" />
            <use xlink:href="#vLine" x="0" />
            <use xlink:href="#vLine" x="10" />
            <use xlink:href="#vLine" x="20" />
            <use xlink:href="#vLine" x="30" />
            <use xlink:href="#vLine" x="40" />
            <use xlink:href="#vLine" x="50" />
            <use xlink:href="#vLine" x="60" />
            <use xlink:href="#vLine" x="70" />
            <use xlink:href="#vLine" x="80" />
            <use xlink:href="#vLine" x="90" />
            <use xlink:href="#vLine" x="100" />
            <use xlink:href="#vLine" x="110" />
            <use xlink:href="#vLine" x="120" />
            <use xlink:href="#vLine" x="130" />
            <use xlink:href="#vLine" x="140" />
            <use xlink:href="#vLine" x="150" />
            <use xlink:href="#vLine" x="160" />
            <use xlink:href="#vLine" x="170" />
            <use xlink:href="#vLine" x="180" />
            <use xlink:href="#vLine" x="190" />
        </g>
    </svg>`,


    1: `<style>
        #bg-1 rect {
            fill: rgb(162, 114, 23);
            transition: fill 2s;
        }
        rect#vLine {
            fill: rgb(48, 30, 2);
            animation: scaleStuff 20s infinite alternate ease-in-out;
        }
        rect#hLine {
            fill: rgb(48, 30, 2);
            animation: rotateRight 60s infinite alternate ease-in-out;
        }
        
        .bloody #vLine { fill: rgb(2,30,48)}
        .bloody #hLine { fill: rgb(2,30,48)}
        .bloody #bg-1 .bg { fill:rgb(23,114,162)}

        @keyframes rotateRight {
            from { transform: rotate(0.04turn) scale(1); }
            to { transform: rotate(-0.04turn) scale(1.3); }
        }
        @keyframes scaleStuff { from { transform: translateX(10px) scale(1.2); }}
    </style>
    <svg id='bg-1' width='100%' height='100%' viewbox="0 0 100 100">
        <defs>
            <rect id="vLine" class='line' width="3" height="400" y="50" x="50" />
            <rect id="hLine" class='line' width="400" height="3" x="-50" y="0" />
        </defs>
        <rect class="bg" width="400" height="400" x="-100" y="-100" />
        <g id='hLines' transform-origin="100 100" transform="rotate(60)">
            <use xlink:href="#hLine" y="0 "/>
            <use xlink:href="#hLine" y="10" />
            <use xlink:href="#hLine" y="20" />
            <use xlink:href="#hLine" y="30" />
            <use xlink:href="#hLine" y="40" />
            <use xlink:href="#hLine" y="50" />
            <use xlink:href="#hLine" y="60" />
            <use xlink:href="#hLine" y="70" />
            <use xlink:href="#hLine" y="80" />
            <use xlink:href="#hLine" y="90" />
            <use xlink:href="#hLine" y="100" />
            <use xlink:href="#hLine" y="110" />
            <use xlink:href="#hLine" y="120" />
            <use xlink:href="#hLine" y="130" />
            <use xlink:href="#hLine" y="140" />
            <use xlink:href="#hLine" y="150" />
            <use xlink:href="#hLine" y="160" />
            <use xlink:href="#hLine" y="170" />
            <use xlink:href="#hLine" y="180" />
            <use xlink:href="#hLine" y="190" />
        </g>
        <g id='vLines' transform-origin="200 200"  transform="rotate(100)">
            <use xlink:href="#vLine" x="-20" />
            <use xlink:href="#vLine" x="-10" />
            <use xlink:href="#vLine" x="0" />
            <use xlink:href="#vLine" x="10" />
            <use xlink:href="#vLine" x="20" />
            <use xlink:href="#vLine" x="30" />
            <use xlink:href="#vLine" x="40" />
            <use xlink:href="#vLine" x="50" />
            <use xlink:href="#vLine" x="60" />
            <use xlink:href="#vLine" x="70" />
            <use xlink:href="#vLine" x="80" />
            <use xlink:href="#vLine" x="90" />
            <use xlink:href="#vLine" x="100" />
            <use xlink:href="#vLine" x="110" />
            <use xlink:href="#vLine" x="120" />
            <use xlink:href="#vLine" x="130" />
            <use xlink:href="#vLine" x="140" />
            <use xlink:href="#vLine" x="150" />
            <use xlink:href="#vLine" x="160" />
            <use xlink:href="#vLine" x="170" />
            <use xlink:href="#vLine" x="180" />
            <use xlink:href="#vLine" x="190" />
        </g>
    </svg>`,

    2: `<style>
        #bg-2 rect {
            fill: rgb(30, 0, 20);
            transition: fill 2s;
        }
        rect#vLine {
            fill: rgb(50,5,10);
            animation: scaleStuff 30s infinite alternate ease-in-out;
        }
        rect#hLine {
            fill: rgb(50,5,10);
            animation: rotateRight 40s infinite alternate ease-in-out;
        }
        
        .bloody #vLine, .bloody #hLine { fill: rgb(90,30,30)}
        .bloody #bg-2 .bg { fill:rgb(280,20,80)}

        @keyframes rotateRight {
            from { transform: rotate(0.04turn) scale(1); }
            to { transform: rotate(-0.04turn) scale(1.3); }
        }
        @keyframes scaleStuff { from { transform: translateX(10px) scale(1.2); }}
    </style>
    <svg id='bg-2' width='100%' height='100%' viewbox="0 0 100 100">
        <defs>
            <rect id="vLine" class='line' width="3" height="400" y="-50" x="-50" />
            <rect id="hLine" class='line' width="400" height="3" x="-100" y="0" />
        </defs>
        <rect class="bg" width="400" height="400" x="-100" y="-100" />
        <g id='hLines' transform-origin="100 100" transform="rotate(30)">
            <use xlink:href="#hLine" y="0 "/>
            <use xlink:href="#hLine" y="10" />
            <use xlink:href="#hLine" y="20" />
            <use xlink:href="#hLine" y="30" />
            <use xlink:href="#hLine" y="40" />
            <use xlink:href="#hLine" y="50" />
            <use xlink:href="#hLine" y="60" />
            <use xlink:href="#hLine" y="70" />
            <use xlink:href="#hLine" y="80" />
            <use xlink:href="#hLine" y="90" />
            <use xlink:href="#hLine" y="100" />
            <use xlink:href="#hLine" y="110" />
            <use xlink:href="#hLine" y="120" />
            <use xlink:href="#hLine" y="130" />
            <use xlink:href="#hLine" y="140" />
            <use xlink:href="#hLine" y="150" />
            <use xlink:href="#hLine" y="160" />
            <use xlink:href="#hLine" y="170" />
            <use xlink:href="#hLine" y="180" />
            <use xlink:href="#hLine" y="190" />
        </g>
        <g id='vLines' transform-origin="100 100"  transform="rotate(80)">
            <use xlink:href="#vLine" x="-20" />
            <use xlink:href="#vLine" x="-10" />
            <use xlink:href="#vLine" x="0" />
            <use xlink:href="#vLine" x="10" />
            <use xlink:href="#vLine" x="20" />
            <use xlink:href="#vLine" x="30" />
            <use xlink:href="#vLine" x="40" />
            <use xlink:href="#vLine" x="50" />
            <use xlink:href="#vLine" x="60" />
            <use xlink:href="#vLine" x="70" />
            <use xlink:href="#vLine" x="80" />
            <use xlink:href="#vLine" x="90" />
            <use xlink:href="#vLine" x="100" />
            <use xlink:href="#vLine" x="110" />
            <use xlink:href="#vLine" x="120" />
            <use xlink:href="#vLine" x="130" />
            <use xlink:href="#vLine" x="140" />
            <use xlink:href="#vLine" x="150" />
            <use xlink:href="#vLine" x="160" />
            <use xlink:href="#vLine" x="170" />
            <use xlink:href="#vLine" x="180" />
            <use xlink:href="#vLine" x="190" />
        </g>
    </svg>`,
}