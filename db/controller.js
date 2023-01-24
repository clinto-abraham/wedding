//  Controller 
import FilesEngage from '../model/engageSchema'
import FilesMarriage from '../model/marriageSchema'

// get : http://localhost:3000/api/engage-pics
export async function getEngageFiles(req, res) {
    try {
        const users = await FilesEngage.find({})

        if (!users) return res.status(404).json({ error: "Data not Found" })
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: "Error While Fetching Data" })
    }
}

// get : http://localhost:3000/api/marriage-pics
export async function getMarriageFiles(req, res) {
    try {
        const users = await FilesMarriage.find({})

        if (!users) return res.status(404).json({ error: "Data not Found" })
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: "Error While Fetching Data" })
    }
}

// post : http://localhost:3000/api/engage-pics
export async function postEngageFiles(req, res) {
    try {
        const formData = req.body;
        if (!formData) return res.status(404).json({ error: "Form Data Not Provided...!" });
        FilesEngage.create(formData, function (err, data) {
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(404).json({ error })
    }
}

// post : http://localhost:3000/api/marriage-pics
export async function postMarriageFiles(req, res) {
    try {
        const formData = req.body;
        if (!formData) return res.status(404).json({ error: "Form Data Not Provided...!" });
        FilesMarriage.create(formData, function (err, data) {
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(404).json({ error })
    }
}