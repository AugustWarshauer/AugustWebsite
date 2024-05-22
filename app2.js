
let poprun = true;
let running = true;
let newArray = [];
let newdeleteArray = [];

function populate(size) {
    for (let i = 1; i < size+1; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.setAttribute('id',`a${i}`);
        const boxcontainer = document.querySelector('.box-container');
        boxcontainer.appendChild(div);
    }
}


function startingSEED(size) {
    let originalArray = [];
    for (let i = 0; i < 10; i++) {
        originalArray.push(Math.floor(Math.random()*(size+1)));
    }
    let colorArray = [247,147,26];
    for (let i = 0; i < originalArray.length; i++) {
        /*    
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255); [48,89,253],[48,89,253],[48,89,253],[48,89,253],[48,89,253]
        let b = Math.floor(Math.random()*255);   */
        const currentValue = originalArray[i];  
        const boxes = document.querySelectorAll(`#a${currentValue}`);
                boxes.forEach(boxes => {
                    boxes.style.background = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
                    /*
                    
                    boxes.style.background = `rgb(${r}, ${g}, ${b})`; 
                    */
                });
    }

    return originalArray;
}


function MEANSEED(size, damn) {
    let originalArray = [];
    mean = Math.floor(Math.random()*(size+1))
    for (let i = 0; i < 10; i++) {
        while (damn.includes(mean)) {
            mean = Math.floor(Math.random()*(size+1))
        }
        originalArray.push(mean);
        mean = Math.floor(Math.random()*(size+1))
    }
    let colorArray = [99, 99, 99];
    for (let i = 0; i < originalArray.length; i++) {
        /*    
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);   */
        const currentValue = originalArray[i];  
        const boxes = document.querySelectorAll(`#a${currentValue}`);
                boxes.forEach(boxes => {
                    boxes.style.background = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
                    /*
                    boxes.style.background = `rgb(${r}, ${g}, ${b})`; 
                    */
                });
    }

    return originalArray;
}

function getRandomColor(currentValue) {
    const colorString = document.getElementById(`a${currentValue}`).style.background;
    const rgbValues = colorString.substring(4, colorString.length - 1);
    const rgbArray = rgbValues.split(',');
    let red = parseInt(rgbArray[0]);
    let green = parseInt(rgbArray[1]);
    let blue = parseInt(rgbArray[2]);
    red += Math.random() * 5 - 2.5;
    if (red < 150) {
        red = 10
    }
    if (red > 255) {
        red = 255
    }
    green += Math.random() * 5 - 2.5;
    if (green < 70) {
        green = 70
    }
    if (green > 150) {
        green = 150
    }

    blue += Math.random() * 5 - 2.5;
    if (blue > 50) {
        blue = 35
    }
    if (blue < 0) {
        blue = 0
    }
    return `rgb(${red}, ${green}, ${blue})`;
}

function getWeightedColor(currentValue) {
    const colorString = document.getElementById(`a${currentValue}`).style.background;
    const rgbValues = colorString.substring(4, colorString.length - 1);
    const rgbArray = rgbValues.split(',');
    let red = parseInt(rgbArray[0]);
    let green = parseInt(rgbArray[1]);
    let blue = parseInt(rgbArray[2]);
    change = Math.random() * 5 - 2.5;
    red += change;
    green += change;
    blue += change;
    if (red < 45) {
        red = 45
        green = 45
        blue = 45
    }
    if (red > 122) {
        red = 122
        green = 122
        blue = 122
    }
    return `rgb(${red}, ${green}, ${blue})`;
}



function start() {
    const size = 2400;
    const rept = 120;
    const prob = 0.95;
    if (poprun) {
        populate(size);
        originalArray = startingSEED(size);
        deleteArray = MEANSEED(size, originalArray);
    }

    if (running) {
        
        let newArray = [...originalArray];
        for (let i = 0; i < newArray.length; i++) {        
            const currentValue = newArray[i];
            if (currentValue - 1 >= 1 && !originalArray.includes(currentValue - 1) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue-1}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getRandomColor(currentValue);
                });
                originalArray.push(currentValue - 1); // Add currentValue - 1
                if (deleteArray.includes(currentValue-1)) {deleteArray.splice(deleteArray.indexOf(currentValue-1),1);}
            }
            if (currentValue - rept >= 1 && !originalArray.includes(currentValue - rept) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue-120}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getRandomColor(currentValue);
                });
                originalArray.push(currentValue - rept); // Add currentValue - 1
                if (deleteArray.includes(currentValue-rept)) {deleteArray.splice(deleteArray.indexOf(currentValue-rept),1);}
            }
            if (currentValue + 1 <= size && !originalArray.includes(currentValue + 1) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue+1}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getRandomColor(currentValue);
                });
                originalArray.push(currentValue + 1); // Add currentValue + 1
                if (deleteArray.includes(currentValue+1)) {deleteArray.splice(deleteArray.indexOf(currentValue+1),1);}
            }
            if (currentValue + rept <= size && !originalArray.includes(currentValue + rept) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue+120}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getRandomColor(currentValue);
                });
                originalArray.push(currentValue + rept); // Add currentValue - 1
                if (deleteArray.includes(currentValue+rept)) {deleteArray.splice(deleteArray.indexOf(currentValue+rept),1);}
            }
        }



        let newdeleteArray = [...deleteArray];
        for (let i = 0; i < newdeleteArray.length; i++) {        
            const currentValue = newdeleteArray[i];
            if (currentValue - 1 >= 1 && !deleteArray.includes(currentValue - 1) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue-1}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getWeightedColor(currentValue);
                });
                deleteArray.push(currentValue - 1); // Add currentValue - 1
                if (originalArray.includes(currentValue-1)) {originalArray.splice(originalArray.indexOf(currentValue-1),1);}
            }
            if (currentValue - rept >= 1 && !deleteArray.includes(currentValue - rept) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue-120}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getWeightedColor(currentValue);
                });
                deleteArray.push(currentValue - rept); // Add currentValue - 1
                if (originalArray.includes(currentValue-rept)) {originalArray.splice(originalArray.indexOf(currentValue-rept),1);}
            }
            if (currentValue + 1 <= size && !deleteArray.includes(currentValue + 1) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue+1}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getWeightedColor(currentValue);
                });
                deleteArray.push(currentValue + 1); // Add currentValue + 1
                if (originalArray.includes(currentValue+1)) {originalArray.splice(originalArray.indexOf(currentValue+1),1);}
            }
            if (currentValue + rept <= size && !deleteArray.includes(currentValue + rept) && Math.random() > prob) {
                const boxes = document.querySelectorAll(`#a${currentValue+120}`);
                boxes.forEach(boxes => {
                    boxes.style.background = getWeightedColor(currentValue);
                });
                deleteArray.push(currentValue + rept); // Add currentValue - 1
                if (originalArray.includes(currentValue+rept)) {originalArray.splice(originalArray.indexOf(currentValue+rept),1);}
            }
        }




    }
    setTimeout(start, 10);
    if (originalArray.length >= size ) {
        running = false;
    }
    if (deleteArray.length >= size ) {
        running = false;
    }

    poprun = false;
    
}


start();