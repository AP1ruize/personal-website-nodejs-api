const express = require("express")
const CodeController=require("../../controllers/inviteCode")
const CheckAdmin = require("../../middleware/checkAdmin")

const router =express.Router();

router.get("/show", CheckAdmin, CodeController.showAllCodes);

router.post("/new", CheckAdmin, CodeController.newInviteCode);

router.delete("/:code", CheckAdmin, CodeController.deleteACode);

// export default router;
module.exports=router;