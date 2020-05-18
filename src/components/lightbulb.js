import React from "react"

import useLocalStorage from '../hooks/useLocalStorage';


const Ligthbulb = () => {
    const [, setTheme] = useLocalStorage('theme')

    const toggleTheme = () => {
        const body = document.querySelector('body');
        const newTheme = body.className === 'dark' ? 'light' : 'dark';
        body.className = newTheme;
        setTheme(newTheme);
    }

    return (
        <div className='lightbulbstring'>
            <div className='lightcircle'></div>
            <button className="lightbulb" aria-label="Toggle theme" onClick={toggleTheme}>
                <svg
                    width="1280.000000pt"
                    height="1280.000000pt"
                    viewBox="0 0 1280.000000 1280.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <defs id="defs24" />
                    <path
                        d="m 931.49725,801.46593 c 39.91747,104.64585 24.82524,210.11597 -54.52787,300.15237 -81.54269,92.5206 -130.20957,123.0406 -248.09056,123.0406 -117.88098,0 -174.19292,-27.4204 -257.54736,-118.3122 -83.35444,-90.8919 -99.00418,-207.00223 -40.34262,-323.79442 51.62252,-102.77781 35.93347,-98.05275 87.62676,-205.58403 59.90565,-124.61445 -22.3694,-328.67798 191.34958,-302.72032 122.39211,14.86537 188.59926,-21.58199 186.62118,184.50999 -1.05394,109.8081 87.41337,218.19065 134.91089,342.70801 z"
                        id="bgPath" />
                    <g
                        transform="matrix(0.1,0,0,0.1,0,-14.864959)"
                        fill="#000000"
                        stroke="none"
                        id="g18">
                        <path
                            d="m 6070,12749 c -673,-30 -1313,-255 -1875,-658 -521,-374 -961,-929 -1202,-1515 -306,-744 -361,-1547 -158,-2321 64,-244 183,-555 282,-735 20,-36 92,-177 161,-315 548,-1100 894,-2017 1041,-2760 39,-196 59,-359 71,-580 17,-294 44,-519 74,-608 86,-256 217,-401 421,-464 57,-17 125,-18 1360,-18 1234,0 1303,1 1360,18 135,42 240,123 320,247 44,68 94,183 114,260 15,62 61,508 61,600 0,41 7,136 16,210 95,825 527,2002 1222,3335 220,422 345,818 408,1290 22,168 26,687 6,845 -106,840 -440,1541 -1011,2123 -704,717 -1659,1091 -2671,1046 z m 415,-359 c 421,-35 790,-137 1155,-320 925,-463 1562,-1324 1736,-2348 72,-427 51,-926 -56,-1353 -75,-297 -160,-507 -365,-899 C 8356,6321 7926,5168 7796,4360 c -28,-169 -41,-300 -51,-485 -10,-192 -43,-489 -61,-542 -20,-60 -55,-121 -86,-150 -56,-53 -56,-53 -633,-53 h -535 v 293 c 0,160 -2,398 -5,527 -3,129 -7,429 -10,665 -5,427 -14,697 -36,1059 -12,198 -2,321 27,351 7,7 48,32 91,55 117,64 355,224 463,311 52,42 167,150 255,240 462,471 754,930 830,1299 25,121 17,280 -19,373 -62,164 -176,274 -358,346 -402,159 -776,-83 -1069,-694 -113,-236 -227,-552 -320,-888 -24,-86 -46,-152 -50,-145 -3,7 -10,31 -13,53 -35,202 -98,426 -167,591 -222,533 -485,815 -784,841 -214,18 -424,-132 -526,-376 -164,-393 -87,-896 199,-1301 83,-117 258,-294 374,-378 231,-168 520,-333 635,-362 48,-13 52,-16 57,-49 8,-54 34,-492 46,-781 9,-210 28,-1468 30,-1912 v -118 h -547 c -616,0 -597,-2 -661,76 -83,100 -98,190 -142,832 -56,805 -463,1983 -1178,3402 -259,514 -321,668 -397,985 -66,274 -78,392 -79,755 -1,266 2,347 17,444 56,369 143,654 296,971 394,816 1116,1429 1976,1679 358,104 762,146 1120,116 z M 7581,8298 c 90,-49 121,-95 127,-190 16,-251 -228,-673 -666,-1152 -161,-175 -276,-278 -425,-378 -111,-74 -117,-77 -111,-51 26,118 122,478 163,613 198,652 420,1057 643,1170 57,29 70,31 134,27 58,-3 84,-10 135,-39 z M 5311,8029 c 201,-102 443,-558 549,-1032 45,-203 109,-612 97,-624 -17,-17 -391,222 -518,330 -189,163 -323,370 -394,612 -49,164 -46,411 6,549 59,160 154,220 260,165 z"
                            id="bulbPath" />
                        <path
                            d="m 4933,2646 c -134,-43 -219,-159 -217,-301 1,-121 66,-223 177,-276 l 58,-27 -53,-24 c -77,-36 -113,-71 -150,-145 -43,-88 -45,-180 -6,-263 38,-82 138,-170 193,-170 29,0 15,-17 -24,-29 -57,-17 -143,-99 -172,-163 -33,-76 -32,-174 2,-248 35,-76 77,-121 146,-156 l 58,-29 h 1295 1295 l 53,24 c 69,31 145,114 167,182 51,152 -26,326 -171,386 -43,17 -57,33 -31,33 21,0 90,41 125,73 18,18 46,58 62,91 77,154 4,347 -159,419 -54,23 -54,24 -25,30 46,9 124,68 161,121 42,61 56,114 51,196 -6,112 -66,202 -171,258 l -52,27 -1285,2 c -1037,1 -1293,-1 -1327,-11 z m 2297,-418 c 67,-34 93,-79 88,-153 -4,-71 -30,-114 -82,-139 -31,-14 -129,-16 -999,-16 h -964 l -34,23 c -50,33 -83,105 -74,163 7,51 52,109 100,130 24,11 217,13 975,14 h 946 z m -475,-687 c 48,-22 69,-44 90,-96 35,-81 -17,-187 -103,-213 -29,-9 -226,-12 -723,-12 -644,0 -686,2 -725,19 -104,47 -132,177 -56,262 53,59 43,58 792,58 644,1 687,-1 725,-18 z"
                            id="path14" />
                        <path
                            d="m 5270,694 c 0,-4 26,-38 58,-77 163,-200 441,-359 712,-408 108,-19 326,-17 430,5 162,34 302,91 445,184 70,46 272,237 294,280 l 12,22 h -976 c -536,0 -975,-3 -975,-6 z"
                            id="path16" />
                    </g>
                </svg >

            </button >
        </div >
    )
}

export default Ligthbulb;