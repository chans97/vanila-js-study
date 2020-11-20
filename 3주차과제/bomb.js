'use strict';
const myURL = "index.html";
const bombGame = (parent, ro, co, bomb) => {
    const range = (start, end) => {
        let array = [];
        for (let i = start; i < end + 1; ++i) {
            array.push(i);
        }
        return array;
    }

    const row = ro;
    const col = co;
    const bombNumber = bomb;

    let dir = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
    ];

    const rowList = range(1, row);
    const colList = range(1, col);
    const bombList = range(0, bombNumber - 1);

    const make_Game = (parent) => {
        makeSection(parent);
        checkTime()//시간 체크 후 보여주기
        document.querySelector("#flag_div").innerHTML = "🏴‍☠" + " : " + bombNumber;
        document.body.addEventListener("auxclick", checkFlagNumber); //폭탄 개수 - 깃발 개수

        let totallist = ramdomBombList();
        let bombListi = totallist[0];
        let bombListj = totallist[1];

        setBomb(bombListi, bombListj);//랜덤지뢰설정
        setNumber();//지뢰기반 숫자 설정
        showNumber();//숫자보이기
        pickFlag();//flag관련 엑티브
        document.body.addEventListener("auxclick", checkRightBombNumber); //for success
        document.body.addEventListener("click", checkLastBombNumber); //for success
        let bombList = document.getElementsByName("10");
        bombList.forEach((i) => {
            i.addEventListener("click", parseBomb); //for fail 폭탄 선택시
        })
        let zeroList = document.getElementsByName("0");
        zeroList.forEach((i) => {
            i.addEventListener("click", extendZero);//0 누를 시 확장
        })
        const commonNumberList = range(1, 9);
        /*
        commonNumberList.forEach((i) => {
            document.getElementsByName(i).addEventListener("click", extendZero)
        })
        */
    }

    const checkFlagNumber = () => {
        let count = 0;
        rowList.forEach((i) => {
            colList.forEach((j) => {
                count = count + checkOneFlagNumber(i, j);
            })
        })
        let leftFlag = bombNumber - count;
        document.querySelector("#flag_div").innerHTML = "🏴‍☠" + " : " + leftFlag;
    }
    const checkOneFlagNumber = (i, j) => {
        let point = document.getElementById([i, j]);
        if (point.value == "picked") {
            return 1;
        }
        return 0;
    }
    const checkTime = () => {
        document.querySelector("#time_div").innerHTML = "Time" + " : " + 0 + "초"
        var startTime = new Date().getTime();
        var timeInterval = setInterval(() => {
            let nowTime = new Date().getTime();
            var passedTime = Math.floor((nowTime - startTime) / 1000);
            window.localStorage.setItem("passedTime", passedTime);
            document.querySelector("#time_div").innerHTML = "Time" + " : " + passedTime + "초"
        }, 1000)
    }

    const parseBomb = (e) => {
        let text = "실패!!"
        let time = "지뢰도 못 찾는 바보~"
        //clearInterval(timeInterval);
        endGame(text, time);
    }


    const extendZero = (event) => {

        if (event.path != undefined) {
            let zeroarray = event.path[0].id.split(",")
            var i = Number(zeroarray[0]);
            var j = Number(zeroarray[1]);
        }
        else {
            let zeroarray = event.id.split(",")
            var i = Number(zeroarray[0]);
            var j = Number(zeroarray[1]);

        }

        let pointList = [];
        dir.forEach((value) => {
            let point = document.getElementById([i + value[0], j + value[1]]);
            pointList.push(point);
        })
        /*
        let point1 = document.getElementById([i - 1, j - 1]);
        let point2 = document.getElementById([i - 1, j]);
        let point3 = document.getElementById([i - 1, j + 1]);
        let point4 = document.getElementById([i, j - 1]);
        let point5 = document.getElementById([i, j + 1]);
        let point6 = document.getElementById([i + 1, j - 1]);
        let point7 = document.getElementById([i + 1, j]);
        let point8 = document.getElementById([i + 1, j + 1]);
        let pointList = [point1, point2, point3, point4, point5, point6, point7, point8];*/
        pointList.forEach((point) => {
            if (point != null) {
                if (point.name == "0" && point.innerHTML == "") {
                    point.innerHTML = "*";
                    extendZero(point);
                }
                else if (point.name != "0") {
                    point.innerHTML = point.name;
                }
            }
        })
    }

    const makeSection = (parent) => {

        let sectionRow = rowList;
        let topdiv = elt("div", { class: "top_div" })
        let playField = elt("div", { class: "play_field" })

        //인포메이션바 생성
        let title = elt("div", { class: "title_div" }, "고전명작 지뢰찾기")
        let time = elt("div", { id: "time_div", class: "time_div" },)
        let flag = elt("div", { id: "flag_div", class: "flag_div" },)
        let informaiton = elt("div", { class: "information_div" }, time, flag)

        topdiv.appendChild(elt("div", { class: "information_bar" }, title, informaiton));

        //지뢰찾기 필드생성
        sectionRow.forEach((i) => {
            let sectionCol = colList;
            let firstlist = [];
            sectionCol.forEach((j) => {
                let abutton = makeA_Button(i, j);
                firstlist.push(abutton);
            })
            playField.appendChild(eltbomb("div", { oncontextmenu: "return false" }, firstlist));
        })

        topdiv.appendChild(playField);
        parent.appendChild(topdiv);
    }

    const makeA_Button = (i, j) => {
        let point = [i, j];
        let abutton = elt("button", { id: point, class: "button" },)//document.createElement("button")
        return abutton;
    }

    const setBomb = (bombListi, bombListj) => {
        bombList.forEach((i) => {
            makeA_Bomb(bombListi[i], bombListj[i])
        })
    }

    const makeA_Bomb = (i, j) => {

        let bomb = document.getElementById([i, j]);
        bomb.name = 10;
        //bomb.classList.add("bomb");
    }

    /*random bomb 설치 방법, 1~100까지 랜덤으로 10개 뽑아,
    그 이후에 앞주리수=i, 뒷자리수=j, 할당하고 나온좌표 10개 리스트로 반환*/
    const ramdomBombList = () => {
        const numOfbomb = bombNumber

        let bombListi = []
        let bombListj = []
        let totallist = []

        //list = rowList;
        while (bombListi.length != numOfbomb) {
            let randomnumber = getRandomInt(0, row * col);
            if (!totallist.includes(randomnumber)) {
                let i = randomnumber / col;
                i = Math.floor(i);
                let j = randomnumber - col * i + 1;
                ++i;
                totallist.push(randomnumber);
                bombListi.push(i);
                bombListj.push(j);
            }
        };

        //console.log(bombListi, bombListj);
        let returnlist = [bombListi, bombListj];
        return returnlist;
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    const rollAllButton = (func) => {
        rowList.forEach((i) => {
            colList.forEach((j) => {
                func(i, j);
            }
            )
        })
    }

    const setNumber = () => {
        rollAllButton(setOnebuttonNumber);
    }

    const setOnebuttonNumber = (i, j) => {
        let count = 0;

        let pointList = [];
        dir.forEach((value) => {
            let point = document.getElementById([i + value[0], j + value[1]]);
            pointList.push(point);
        })

        pointList.forEach((point) => {
            if (document.getElementById([i, j]).name != "10") {//v폭탄이 아닐 경우만 
                if (point != null) {
                    if (point.name == "10") {
                        count++;
                    }
                }
                document.getElementById([i, j]).name = count;
            }
        })

    }

    const showNumber = () => {
        rollAllButton(showOneNumber);
    }

    const showOneNumber = (i, j) => {
        let point = document.getElementById([i, j]);
        point.addEventListener("click", () => {
            if (point.name == "0") {
                point.innerHTML = "*";
            }
            else {

                point.innerHTML = point.name;
            }
        })
    }

    const pickFlag = () => {
        rollAllButton(pickOneBomb);
    }

    const pickOneBomb = (i, j) => {
        let point = document.getElementById([i, j]);
        point.addEventListener("auxclick", () => {
            if (point.value != "picked") {
                point.innerHTML = "🚩";
                point.value = "picked";
            }
            else {
                point.innerHTML = "";
                point.value = "";
            }

        })
    }

    const checkLastBombNumber = () => {
        let rightBombCount = 0;
        rowList.forEach((i) => {
            colList.forEach((j) => {
                rightBombCount = rightBombCount + checkOneRightBombNumber(i, j);
            }
            )
        })
        let emptyCount = 0;
        rowList.forEach((i) => {
            colList.forEach((j) => {
                emptyCount = emptyCount + checkOneEmptyNumber(i, j);
            }
            )
        })
        let lastBombNumber = bombNumber - rightBombCount;
        if (lastBombNumber == emptyCount) {

            let passedTime = window.localStorage.getItem("passedTime");
            //clearInterval(timeInterval);
            let text = "모든 지뢰를 찾으셨습니다. 혹시 천재?"
            let time = "기록 : " + passedTime + "초"
            endGame(text, time);
        }
    }

    const checkRightBombNumber = () => {
        let count = 0;
        rowList.forEach((i) => {
            colList.forEach((j) => {
                count = count + checkOneRightBombNumber(i, j);
            }
            )
        })
        if (count == bombNumber) {
            let passedTime = window.localStorage.getItem("passedTime");
            //clearInterval(timeInterval);

            let text = "모든 지뢰를 찾으셨습니다. 혹시 천재?"
            let time = "기록 : " + passedTime + "초"
            endGame(text, time);
        }
    }
    const checkOneRightBombNumber = (i, j) => {
        let point = document.getElementById([i, j]);
        if (point.value == "picked" && point.name == "10") {
            return 1;
        }
        return 0;
    }

    const checkOneEmptyNumber = (i, j) => {
        let point = document.getElementById([i, j]);
        if (point.innerHTML == "") {
            return 1;
        }
        return 0;
    }

    /*

    const endGame = (text, time) => {
        let url = myURL;
        let childWindow = window.open(url);
        let load = () => {
            childWindow.document.getElementById("text").innerHTML = text;
            childWindow.document.getElementById("time").innerHTML = time;
            console.log(hildWindow.document.getElementById("text").innerHTML);
            window.close();
        };
        childWindow.onload = load;
    }*/

    async function endGame(text, time) {
        let url = myURL;
        let childWindow = await window.open(url);
        let load = () => {
            childWindow.document.getElementById("text").innerHTML = text;
            childWindow.document.getElementById("time").innerHTML = time;
            window.close();
        };
        childWindow.onload = load;
    }

    make_Game(parent);
}
