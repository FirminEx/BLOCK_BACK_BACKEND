import { Static, Type } from '@sinclair/typebox';
import mongoose from 'mongoose';
const { Schema } = mongoose;

interface IGuardian {
  safeguarded: string;
  guardian: string;
  name: string;
  phone: string;
  email: string;
}

const GuardianSchema = new Schema<IGuardian>({
  safeguarded: {
    type: String,
    min: 42,
    max: 42,
    required: true,
  },
  guardian: {
    type: String,
    min: 42,
    max: 42,
    required: true,
  },
  name: { type: String, required: true, min: 1, max: 20 },
  phone: String,
  email: { type: String, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
});

GuardianSchema.index({ safeguarded: 1, guardian: 1 }, { unique: true });

export const Guardian = mongoose.model('Guardian', GuardianSchema);

export const GuardianBody = Type.Object(
  {
    guardian: Type.String({ minLength: 42, maxLength: 42 }),
    name: Type.String({ minLength: 1, maxLength: 20 }),
    phone: Type.Optional(Type.String()),
    email: Type.Optional(Type.String({ pattern: '^[\\w\\-.]+@([\\w-]+\\.)+[\\w-]{2,4}$' })),
  },
  {
    $schema: 'http://json-schema.org/draft-07/schema#',
    additionalProperties: false,
  },
);

export const DeleteGuardianBody = Type.Object(
  {
    deleteAddress: Type.String({ minLength: 42, maxLength: 42 }),
  },
  {
    $schema: 'http://json-schema.org/draft-07/schema#',
    additionalProperties: false,
  },
);

export type GuardianDto = Static<typeof GuardianBody>;

export type DeleteGuardianDto = Static<typeof DeleteGuardianBody>;
