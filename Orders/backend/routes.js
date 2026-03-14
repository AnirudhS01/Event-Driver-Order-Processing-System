const router = require("express").Router()
const {
    PostOrderController,
    GetallOrderController,
    GetOrderbyIdController
} = require("./controllers")

router.post("/postorder", PostOrderController)
router.get("/getorders", GetallOrderController)
router.get("/getorder/:id", GetOrderbyIdController)

module.exports = router