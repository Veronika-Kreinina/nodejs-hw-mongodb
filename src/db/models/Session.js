import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: { Date, required: true },
    refreshTokenValidUntil: { Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const SessionCollection = model('session', sessionSchema);
