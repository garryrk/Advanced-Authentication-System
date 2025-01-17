import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};

/*
sameSite: "strict": This ensures that the cookie is only sent in requests that originate from the same site as the one setting the cookie.
 This is an important security feature to protect against Cross-Site Request Forgery (CSRF) attacks. The "strict" setting means the cookie 
 will not be sent with requests originating from other domains.
*/
