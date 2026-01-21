import Message from "../models/message.model.js"
import User from "../models/user.modules.js"

export const sendMessage = async (req, res) => {
    const { userId: senderId } = req
    const recivedId = req.params.id
    const { text, imageMessage } = req.body
    try {
        if (!text && !imageMessage) {
            res.status(400).json({ message: "message couldn't send empty" })
        }

        const findRecivedUser = await User.findById(recivedId)
        if (!findRecivedUser) {
            res.status(400).json({ message: "thise user is not in data base" })
        }
        const newMessage = await Message.create({
            senderId,
            recivedId,
            text,
            imageMessage,
        })
        if (newMessage) {
            res.status(200).json({ message: "message sent ", newMessage })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server don't respond" })
    }



}

export const getAllmessage = async (req, res) => {
    const { userId } = req
    try {
        const allmessageUser = await Message.find({
            $or: [{ senderId: userId }, { recivedId: userId }]
        })
        if (!allmessageUser) {
            res.status(400).json({ message: "message does't found" })
        }
        res.status(200).json({ allmessageUser })



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server don't respond", error })
    }
}

export const getAlluser = async (req, res) => {
    const { userId } = req
    try {
        const allusers = await User.find({
            _id: { $ne: userId }
        }).select("-password");

        res.status(200).json({ nameUser: allusers })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'server doesnt respond', error })
    }
}

export const getContactMessage = async (req, res) => {
    const { userId } = req
    const reciveduserId = req.params.id
    console.log(userId, reciveduserId)
    try {
        const messages = await Message.find({
            $or: [{ senderId: userId, recivedId: reciveduserId },
            { senderId: reciveduserId, recivedId: userId }
            ]
        }).populate("senderId recivedId", "name ")
        if (messages) {
            res.status(200).json(messages)
        }
    } catch (error) {
        console.log(error?.message)
    }
}

// export const chatPartenr=async(req,res)=>{
// const userId=req
// }