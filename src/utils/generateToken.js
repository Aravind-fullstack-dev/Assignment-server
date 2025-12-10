import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing!");
    }
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.user_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};
