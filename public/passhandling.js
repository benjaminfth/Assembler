let leftselected, rightselected, side
var confetti={maxCount:150,speed:2,frameInterval:15,alpha:1,gradient:!1,start:null,stop:null,toggle:null,pause:null,resume:null,togglePause:null,remove:null,isPaused:null,isRunning:null};!function(){confetti.start=s,confetti.stop=w,confetti.toggle=function(){e?w():s()},confetti.pause=u,confetti.resume=m,confetti.togglePause=function(){i?m():u()},confetti.isPaused=function(){return i},confetti.remove=function(){stop(),i=!1,a=[]},confetti.isRunning=function(){return e};var t=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame,n=["rgba(30,144,255,","rgba(107,142,35,","rgba(255,215,0,","rgba(255,192,203,","rgba(106,90,205,","rgba(173,216,230,","rgba(238,130,238,","rgba(152,251,152,","rgba(70,130,180,","rgba(244,164,96,","rgba(210,105,30,","rgba(220,20,60,"],e=!1,i=!1,o=Date.now(),a=[],r=0,l=null;function d(t,e,i){return t.color=n[Math.random()*n.length|0]+(confetti.alpha+")"),t.color2=n[Math.random()*n.length|0]+(confetti.alpha+")"),t.x=Math.random()*e,t.y=Math.random()*i-i,t.diameter=10*Math.random()+5,t.tilt=10*Math.random()-10,t.tiltAngleIncrement=.07*Math.random()+.05,t.tiltAngle=Math.random()*Math.PI,t}function u(){i=!0}function m(){i=!1,c()}function c(){if(!i)if(0===a.length)l.clearRect(0,0,window.innerWidth,window.innerHeight),null;else{var n=Date.now(),u=n-o;(!t||u>confetti.frameInterval)&&(l.clearRect(0,0,window.innerWidth,window.innerHeight),function(){var t,n=window.innerWidth,i=window.innerHeight;r+=.01;for(var o=0;o<a.length;o++)t=a[o],!e&&t.y<-15?t.y=i+100:(t.tiltAngle+=t.tiltAngleIncrement,t.x+=Math.sin(r)-.5,t.y+=.5*(Math.cos(r)+t.diameter+confetti.speed),t.tilt=15*Math.sin(t.tiltAngle)),(t.x>n+20||t.x<-20||t.y>i)&&(e&&a.length<=confetti.maxCount?d(t,n,i):(a.splice(o,1),o--))}(),function(t){for(var n,e,i,o,r=0;r<a.length;r++){if(n=a[r],t.beginPath(),t.lineWidth=n.diameter,i=n.x+n.tilt,e=i+n.diameter/2,o=n.y+n.tilt+n.diameter/2,confetti.gradient){var l=t.createLinearGradient(e,n.y,i,o);l.addColorStop("0",n.color),l.addColorStop("1.0",n.color2),t.strokeStyle=l}else t.strokeStyle=n.color;t.moveTo(e,n.y),t.lineTo(i,o),t.stroke()}}(l),o=n-u%confetti.frameInterval),requestAnimationFrame(c)}}function s(t,n,o){var r=window.innerWidth,u=window.innerHeight;window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,confetti.frameInterval)};var m=document.getElementById("confetti-canvas");null===m?((m=document.createElement("canvas")).setAttribute("id","confetti-canvas"),m.setAttribute("style","display:block;z-index:999999;pointer-events:none;position:fixed;top:0"),document.body.prepend(m),m.width=r,m.height=u,window.addEventListener("resize",function(){m.width=window.innerWidth,m.height=window.innerHeight},!0),l=m.getContext("2d")):null===l&&(l=m.getContext("2d"));var s=confetti.maxCount;if(n)if(o)if(n==o)s=a.length+o;else{if(n>o){var f=n;n=o,o=f}s=a.length+(Math.random()*(o-n)+n|0)}else s=a.length+n;else o&&(s=a.length+o);for(;a.length<s;)a.push(d({},r,u));e=!0,i=!1,c(),t&&window.setTimeout(w,t)}function w(){e=!1}}();
document.addEventListener('DOMContentLoaded', async () => {
    leftselected = "input"
    rightselected = "intermediate"
    document.querySelector('.input-btn').click()
    document.querySelector('.intermediate-btn').click()
})

document.querySelector('.left-box textarea').addEventListener('blur', function () {
    this.setAttribute('readonly', true)
    document.querySelector('.leftsave').click()
})

document.querySelector('.input-btn').addEventListener('click', async () => {
    if (document.querySelector('.left-box textarea').value !== localStorage.getItem('optab.txt') && leftselected === "optab" && localStorage.getItem('optab.txt')) {
        const result = confirm('You have unsaved changes. Do you want to save them?')
        if (result) {
            document.querySelector('.leftsave').click()
        } else {
            return
        }
    }

    document.querySelector('#lname').textContent = "Input File"
    leftselected = "input"
    document.querySelector('.input-btn').style.backgroundColor = "rgba(56, 64, 92, 0.9)" 
    document.querySelector('.optab-btn').style.backgroundColor = "rgba(68, 71, 90, 0.8)" 

    const text = localStorage.getItem('input.txt')
    if (text) {
        document.querySelector('.left-box textarea').value = text
    } else {
        document.querySelector('.left-box textarea').value = ""
        document.querySelector('.left-box textarea').placeholder = "Write your input code here"
    }
})

document.querySelector('.optab-btn').addEventListener('click', async () => {
    if (document.querySelector('.left-box textarea').value !== localStorage.getItem('input.txt') && leftselected === "input" && localStorage.getItem('input.txt')) {
        const result = confirm('You have unsaved changes. Do you want to save them?')
        if (result) {
            document.querySelector('.leftsave').click()
        } else {
            return
        }
    }

    document.querySelector('#lname').innerHTML = "Optab File"
    leftselected = "optab"
    document.querySelector('.optab-btn').style.backgroundColor = "rgba(56, 64, 92, 0.9)" 
    document.querySelector('.input-btn').style.backgroundColor = "rgba(68, 71, 90, 0.8)"  

    const text = localStorage.getItem('optab.txt')
    if (text) {
        document.querySelector('.left-box textarea').value = text
    } else {
        document.querySelector('.left-box textarea').value = ""
        console.log('No optab file found in local storage')
        document.querySelector('.left-box textarea').placeholder = "Write your optab code here"
    }
})


document.querySelector('.intermediate-btn').addEventListener('click', async () => {
    document.querySelector('#rname').innerHTML = "Intermediate File";
    rightselected = "intermediate";
    document.querySelector('.intermediate-btn').style.backgroundColor = "rgba(56, 64, 92, 0.8)"; // Decreased opacity to 0.8
    document.querySelectorAll('.symtab-btn, .output-btn, .output-btn2').forEach((btn) => {
        btn.style.backgroundColor = "rgba(68, 71, 90, 0.8)"; // Decreased opacity to 0.8
    });

    const text = localStorage.getItem('intermediate.txt');
    if (text) {
        document.querySelector('.right-box textarea').value = text;
    } else {
        document.querySelector('.right-box textarea').value = "";
        document.querySelector('.right-box textarea').placeholder = "Run the assembler to generate intermediate file";
    }
});

document.querySelector('.symtab-btn').addEventListener('click', async () => {
    document.querySelector('#rname').innerHTML = "Symtab File";
    rightselected = "symtab";
    document.querySelector('.symtab-btn').style.backgroundColor = "rgba(56, 64, 92, 0.8)"; // Decreased opacity to 0.8
    document.querySelectorAll('.intermediate-btn, .output-btn, .output-btn2').forEach((btn) => {
        btn.style.backgroundColor = "rgba(68, 71, 90, 0.8)"; // Decreased opacity to 0.8
    });

    const text = localStorage.getItem('symtab.txt');
    if (text) {
        document.querySelector('.right-box textarea').value = text;
    } else {
        document.querySelector('.right-box textarea').value = "";
        document.querySelector('.right-box textarea').placeholder = "Run the assembler to generate symtab file";
    }
});

document.querySelector('.output-btn').addEventListener('click', async () => {
    document.querySelector('#rname').innerHTML = "Output File";
    rightselected = "output";
    document.querySelector('.output-btn').style.backgroundColor = "rgba(56, 64, 92, 0.8)"; // Decreased opacity to 0.8
    document.querySelectorAll('.symtab-btn, .intermediate-btn, .output-btn2').forEach((btn) => {
        btn.style.backgroundColor = "rgba(68, 71, 90, 0.8)"; // Decreased opacity to 0.8
    });

    const text = localStorage.getItem('output.txt');
    if (text && text !== "AUGEYSTOOOO") {
        document.querySelector('.right-box textarea').value = text;
    } else {
        document.querySelector('.right-box textarea').value = "";
        document.querySelector('.right-box textarea').placeholder = "Run the assembler to generate output file";
    }
});

document.querySelector('.output-btn2').addEventListener('click', async () => {
    document.querySelector('#rname').innerHTML = "Output Code";
    rightselected = "output2";
    document.querySelector('.output-btn2').style.backgroundColor = "rgba(56, 64, 92, 0.8)"; // Decreased opacity to 0.8
    document.querySelectorAll('.symtab-btn, .intermediate-btn, .output-btn').forEach((btn) => {
        btn.style.backgroundColor = "rgba(68, 71, 90, 0.8)"; // Decreased opacity to 0.8
    });

    const text = localStorage.getItem('output2.txt');
    if (text && text !== "AUGEYSTOOOO") {
        document.querySelector('.right-box textarea').value = text;
    } else {
        document.querySelector('.right-box textarea').value = "";
        document.querySelector('.right-box textarea').placeholder = "Run the assembler to generate output code";
    }
});


document.getElementById('editButton').addEventListener('click', function () {
    const textarea = document.querySelector('.left-box textarea')
    textarea.removeAttribute('readonly')
    textarea.focus()
})

document.querySelector('.leftsave').addEventListener('click', async function () {
    console.log('leftsave clicked')
    const textArea = document.querySelector('.left-box textarea')
    const content = textArea.value

    let fileName
    if (leftselected === "input") {
        fileName = 'input.txt'
    } else if (leftselected === "optab") {
        fileName = 'optab.txt'
    }

    localStorage.setItem(fileName, content)
})

document.querySelector('.left-download').addEventListener('click', async function () {
    side = "left"
})
document.querySelector('.right-download').addEventListener('click', async function () {
    side = "right"
})
document.querySelectorAll('.download').forEach(element => {
    element.addEventListener('click', async function () {
        let fileName
        if (side === "left") {
            leftselected === "input" ? fileName = 'input.txt' : fileName = 'optab.txt'
        } else if (side === "right") {
            if (rightselected === "intermediate") {
                fileName = 'intermediate.txt'
            } else if (rightselected === "symtab") {
                fileName = 'symtab.txt'
            } else if (rightselected === "output") {
                fileName = 'output.txt'
            } else if (rightselected === "output2") {
                fileName = 'output2.txt'
            }

        }
        const text = localStorage.getItem(fileName)


        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: 'Text Files',
                    accept: { 'text/plain': ['.txt'] },
                }],
            })

            const writable = await handle.createWritable()
            await writable.write(text)
            await writable.close()
        } catch (error) {
            console.error('Error saving file:', error)
        }
    })
})

document.querySelector('.reset-btn').addEventListener('click', async () => {
    const result = confirm('Do you want to clear both the files?')
    if (result) {
        document.querySelector('.left-box textarea').value = ""
        document.querySelector('.right-box textarea').value = ""
        localStorage.clear()

        document.querySelector('.left-box textarea').placeholder = "Write your " + leftselected + " code here"
        document.querySelector('.right-box textarea').placeholder = "Run the assembler to generate " + rightselected + " file"
    }
})

document.querySelector('.run-btn').addEventListener('click', async () => {
    const inputString = localStorage.getItem('input.txt')
    const optabString = localStorage.getItem('optab.txt')

    try {
        const response = await fetch("/pass1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: inputString,
                optab: optabString
            })
        })

        if (response.ok) {
            const text = await response.json()
            localStorage.setItem('intermediate.txt', text.intermediate)
            localStorage.setItem('symtab.txt', text.symtab)
            localStorage.setItem('output.txt', text.output)
            localStorage.setItem('output2.txt', text.output2)
            confetti.start(3000);

            if (rightselected === "intermediate")
                document.querySelector('.right-box textarea').value = text.intermediate
            else if (rightselected === "symtab")
                document.querySelector('.right-box textarea').value = text.symtab
            else if (rightselected === "output" && text.output !== "AUGEYSTOOOO")
                document.querySelector('.right-box textarea').value = text.output
            else if (rightselected === "output2" && text.output2 !== "AUGEYSTOOOO")
                document.querySelector('.right-box textarea').value = text.output2
        } else {
            if (response.status === 400) {
                alert("Input or Optab file missing")
            } else if (response.status === 505) {
                const text = await response.json()
                localStorage.setItem('intermediate.txt', text.intermediate)
                localStorage.setItem('symtab.txt', text.symtab)
                localStorage.setItem('output.txt', text.output)
                localStorage.setItem('output2.txt', text.output2)
                if (rightselected === "intermediate") {
                    document.querySelector('.right-box textarea').value = text.intermediate
                } else if (rightselected === "symtab") {
                    document.querySelector('.right-box textarea').value = text.symtab
                } else if (rightselected === "output") {
                    document.querySelector('.right-box textarea').value = ""
                    document.querySelector('.right-box textarea').placeholder = "Wrong input or optab."
                } else if (rightselected === "output2") {
                    document.querySelector('.right-box textarea').value = ""
                    document.querySelector('.right-box textarea').placeholder = "Wrong input or optab."
                }
            } else {
                console.log("Couln't fetch pass 1.")
            }
        }
    } catch (err) {
        console.log(err)
    }
})