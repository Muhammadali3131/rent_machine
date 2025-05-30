const { sendErrorResponse } = require("../helpers/send_error_response");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const { config } = require("../config/db");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    if (!user) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        400
      );
    }

    const verifiedPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!verifiedPassword) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        400
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = jwtService.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.refreshToken, 7);

    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const decodedToken = await jwtService.verifyRefreshToken(refreshToken);

    const user = await User.update(
      { hashed_token: null },
      { where: { id: decodedToken.id }, returning: true }
    );

    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "User logged out" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    await jwtService.verifyRefreshToken(refreshToken);
    const author = await User.findOne({ refresh_token: refreshToken });
    if (!author) {
      return res
        .status(401)
        .send({ message: "Bazada refresh token topilmadi" });
    }
    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
    };
    const tokens = jwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
