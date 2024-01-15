// import express from "express"
const express =require("express")

const router =  express.Router();

router.get('/public', (req, res, next) => {
    res.status(200).json(
        {
            message: "get public notes"
        }
    );
});

router.get('/public/:noteId', (req, res, next) => {
    const noteID = req.params.noteId;
    res.status(200).json(
        {
            message: "get public notes ",
            noteId: noteID
        }
    );
});


router.post('/public/:noteId', (req, res, next) => {
    const noteID = req.params.noteId;
    res.status(200).json(
        {
            message: "post public notes ",
            noteId: noteID
        }
    );
});

router.delete('/public/:noteId', (req, res, next) => {
    const noteID = req.params.noteId;
    res.status(200).json(
        {
            message: "delete public notes ",
            noteId: noteID
        }
    );
});

// export default router;
module.exports=router;