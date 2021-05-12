import JWT from 'jsonwebtoken';

export default function generateAccessToken(userId, role) {
  return JWT.sign({ userId: userId,
    role: role }, process.env.JWT_SECRET, {
    expiresIn: 43200,
  });
}