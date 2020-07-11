import React from "react"

const all = [{ value: 1, id: "one" },
{ value: 2, id: "two" },
{ value: 3, id: "three" },
{ value: 4, id: "four" },
{ value: 5, id: "five" },
{ value: 6, id: "six" },
{ value: 7, id: "seven" },
{ value: 8, id: "eight" },
{ value: 9, id: "nine" },
{ value: 0, id: "zero" },
{ value: "/", id: "divide" },
{ value: "*", id: "multiply" },
{ value: "-", id: "subtract" },
{ value: "+", id: "add" },
{ value: ".", id: "decimal" },
{ value: "=", id: "equals" },
{ value: "AC", id: "clear" },
{ value: "C", id: "bksp" }]

var arr = ["=","C","AC"]

function refiner(x) {
    x = x.replace(/([.])([0-9]*)([.])/, "$1$2")
    x = x.replace(/^([/*+-.])/, "0$1")
    x = x.replace(/([/*+-])([/*+])/g, "$2")
    x = x.replace(/([/*+-][-])[/*+-]*/g, "$1")
    x = x.replace(/([/*-+])([.])/, "$10$2")
    return x
}

function clean(x) {
    x = x.toString()
    x = x.replace(/^[0-9]$/, "0")
    x = x.replace(/([0-9/*+-.]+)[0-9/*+-]$/, "$1")
    return x
}

function find(x) {
    x = x.replace(/([/*+-])([-])([0-9]*)/, "$1 -$3")
    x = x.replace(/([0-9])([/*+-])/g, "$1 $2");
    x = x.replace(/([/*+-])([0-9])/g, "$1 $2");
    x = x.replace(/([/*-+])\s([-])\s([0-9])+/, "$1 -$3")
    x = x.split(" ")

    for (let i = 0; i < x.length; i++) {
        if (isNaN(x[i]) === false) {
            console.log("done");

            parseFloat(x[i]);
        }
    }

    do {
        for (let i = 0; i < x.length; i++) {
            if (x[i] === "/") {
                var insert = x[i - 1] / x[i + 1]
                x.splice(i - 1, 3, insert)
            }
        }
    }
    while (x.includes("/"))
    do {
        for (let i = 0; i < x.length; i++) {
            if (x[i] === "*") {
                insert = x[i - 1] * x[i + 1]
                x.splice(i - 1, 3, insert)
            }
        }
    }
    while (x.includes("*"))
    do {
        for (let i = 0; i < x.length; i++) {
            if (x[i] === "-") {
                insert = x[i - 1] - x[i + 1]
                x.splice(i - 1, 3, insert)
            }
        }
    }
    while (x.includes("-"))
    do {
        for (let i = 0; i < x.length; i++) {
            if (x[i] === "+") {
                insert = parseFloat(x[i - 1]) + parseFloat(x[i + 1])
                x.splice(i - 1, 3, insert)
            }
        }
    }
    while (x.includes("+"))



    x = x.join("")
    return x
}

class Numbers extends React.Component {
    
    handleClick = () => {

        if (this.props.state.display === 0 || this.props.state.display === "0") {
            if (!arr.includes(this.props.value)) {
                console.log("hi")
                var newdisp = this.props.value.toString()
                this.props.handleDisplay(refiner(newdisp))
            }
        }
        else if (this.props.value !== "C") {
            console.log("hi")
            newdisp = this.props.state.display.toString() + this.props.value.toString()
            this.props.handleDisplay(refiner(newdisp))
        }
        if (this.props.value === "=") {
            this.props.handleDisplay(find(this.props.state.display))
        }

        if (this.props.value === "AC") {
            this.props.handleDisplay(0)
        }

        if (this.props.value === "C") {
            this.props.handleDisplay(clean(this.props.state.display))
        }
    }


    render() {
        return (
            <div id={this.props.id} onClick={this.handleClick} className="buttons">{this.props.value}</div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: 0
        }
    }

    handleDisplay = (display) => {
        this.setState({
            display
        })
    }

    render() {
        return (
            <div className="calculator">
                <div id="display">{this.state.display}</div>
                <div className="calbut">
                    {all.map(e =>
                        <Numbers
                            key={e.value}
                            id={e.id}
                            value={e.value}
                            handleDisplay={this.handleDisplay}
                            state={this.state} />
                    )}
                </div>
            </div>
        )
    }
}

export default App