const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


router.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ status: "notok", msg: "Please enter all required data" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "notokmail", msg: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser.id, role: savedUser.role },
            config.get("jwtSecret"),
            { expiresIn: config.get("tokenExpire") }
        );

        res.status(200).json({ status: "ok", msg: "Successfully registered", token, user: savedUser });

    } catch (err) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            config.get("jwtSecret"),
            { expiresIn: config.get("tokenExpire") }
        );

        res.status(200).json({ token, role: user.role });

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/all", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
    const user = await User.findById(id);
    if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
    });
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    try {
    const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email, password, role },
    { new: true }
    );
    if (!updatedUser) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès',
    updatedUser });
    } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
    });

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
    });

module.exports = router;
