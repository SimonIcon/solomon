const door = require("../assets/door.png")
const window = require("../assets/window.png")
const stairs = require("../assets/stairs.png")
const facades = require("../assets/facades.png")
const signages = require('../assets/signages.png')
const laserCut = require('../assets/laserCutPanel.png')
const balcony = require('../assets/balcony.png')
const fences = require("../assets/fence3.png")

const productCategory = [
    {
        id: 200,
        name: "doors",
        productImage: door
    },
    {
        id: 201,
        name: "windows",
        productImage: window,
    },
    {
        id: 202,
        name: "stairs",
        productImage: stairs,
    },
    {
        id: 203,
        name: "facades",
        productImage: facades,
    },
    {
        id: 204,
        name: "signages",
        productImage: signages,
    },
    {
        id: 205,
        name: "laser cut panels",
        productImage: laserCut,
    },
    {
        id: 206,
        name: "balconies",
        productImage: balcony,
    },
    {
        id: 207,
        name: "fences",
        productImage: fences,
    }

]
export default productCategory;