import { useState, useEffect } from "react"
import series from "run-series"
import { Typography, Container, CssBaseline, Grid } from "@mui/material"

function App() {
	const [isBox1Green, setIsBox1Green] = useState(false)
	const [isBox2Green, setIsBox2Green] = useState(false)
	const [isBox3Green, setIsBox3Green] = useState(false)
	const [isBox4Green, setIsBox4Green] = useState(false)
	const [isBox5Green, setIsBox5Green] = useState(false)
	const [isBox6Green, setIsBox6Green] = useState(false)

	const [greenBoxesLabel1, setGreenBoxesLabel1] = useState("")
	const [greenBoxesLabel2, setGreenBoxesLabel2] = useState("")
	const [greenBoxesLabel3, setGreenBoxesLabel3] = useState("")
	const [greenBoxesLabel4, setGreenBoxesLabel4] = useState("")
	const [greenBoxesLabel5, setGreenBoxesLabel5] = useState("")
	const [greenBoxesLabel6, setGreenBoxesLabel6] = useState("")

	const [greenBoxes, setGreenBoxes] = useState([])

	const handleSetBox = (position) => {
		switch (position) {
			case 0:
				setIsBox1Green(!isBox1Green)
				break
			case 1:
				setIsBox2Green(!isBox2Green)
				break
			case 2:
				setIsBox3Green(!isBox3Green)
				break
			case 3:
				setIsBox4Green(!isBox4Green)
				break
			case 4:
				setIsBox5Green(!isBox5Green)
				break
			case 5:
				setIsBox6Green(!isBox6Green)
				break
		}
	}

	const handleClick = (position) => {
		handleSetBox(position)
		addGreenBox(position)
	}

	const addGreenBox = (position) => {
		const tempGreenBoxes = [...greenBoxes]
		const positionPresent = tempGreenBoxes.indexOf(position)
		if (positionPresent > -1) tempGreenBoxes.splice(positionPresent, 1)
		else tempGreenBoxes.push(position)
		setGreenBoxes(tempGreenBoxes)
	}

	const resetBoxLabels = () => {
		setGreenBoxesLabel1("")
		setGreenBoxesLabel2("")
		setGreenBoxesLabel3("")
		setGreenBoxesLabel4("")
		setGreenBoxesLabel5("")
		setGreenBoxesLabel6("")
	}
	const handleSetBoxLabels = (position, label) => {
		switch (position) {
			case 0:
				setGreenBoxesLabel1(label)
				break
			case 1:
				setGreenBoxesLabel2(label)
				break
			case 2:
				setGreenBoxesLabel3(label)
				break
			case 3:
				setGreenBoxesLabel4(label)
				break
			case 4:
				setGreenBoxesLabel5(label)
				break
			case 5:
				setGreenBoxesLabel6(label)
				break
		}
	}

	const handleBoxLabels = () => {
		resetBoxLabels()
		greenBoxes.map((x, index) => {
			handleSetBoxLabels(x, String(index + 1))
		})
	}

	const resetBoxes = () => {
		const reversedGreenBoxes = greenBoxes.reverse()
		const allTasks = reversedGreenBoxes.map((x) => {
			return (callback) => {
				setTimeout(() => {
					handleSetBox(x)
					handleSetBoxLabels(x, "")
					callback(null, true)
				}, 500)
			}
		})
		series(allTasks, () => {
			console.log("Done")
			setGreenBoxes([])
			resetBoxLabels()
		})
	}

	const gridStyle = { height: "100px", margin: "5px" }
	const boxStyle = { width: "100px", height: "100px", border: "2px solid grey", margin: "5px", borderRadius: "10px" }

	useEffect(() => {
		handleBoxLabels()
		if (greenBoxes.length == 6) resetBoxes()
	}, [greenBoxes])

	return (
		<Container>
			<CssBaseline />
			<Grid container direction="column">
				<Grid container item direction="row" justifyContent="center" sx={gridStyle}>
					<Grid item sx={boxStyle} backgroundColor={isBox1Green ? "#00be38" : null} onClick={() => handleClick(0)}>
						<Typography variant="h2" textAlign="center">
							{greenBoxesLabel1}
						</Typography>
					</Grid>
					<Grid item sx={boxStyle} backgroundColor={isBox2Green ? "#00be38" : null} onClick={() => handleClick(1)}>
						<Typography variant="h2" textAlign="center">
							{greenBoxesLabel2}
						</Typography>
					</Grid>
					<Grid item sx={boxStyle} backgroundColor={isBox3Green ? "#00be38" : null} onClick={() => handleClick(2)}>
						<Typography variant="h2" textAlign="center">
							{greenBoxesLabel3}
						</Typography>
					</Grid>
				</Grid>
				<Grid container item direction="row" justifyContent="center" sx={gridStyle}>
					<Grid item sx={boxStyle} backgroundColor={isBox4Green ? "#00be38" : null} onClick={() => handleClick(3)}>
						<Typography variant="h2" textAlign="center">
							{greenBoxesLabel4}
						</Typography>
					</Grid>
					<Grid item sx={boxStyle} backgroundColor={isBox5Green ? "#00be38" : null} onClick={() => handleClick(4)}>
						<Typography variant="h2" textAlign="center">
							{greenBoxesLabel5}
						</Typography>
					</Grid>
					<Grid item sx={boxStyle} backgroundColor={isBox6Green ? "#00be38" : null} onClick={() => handleClick(5)}>
						<Typography variant="h2" textAlign="center">
							{greenBoxesLabel6}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default App
