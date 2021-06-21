import { appSchema } from '@nozbe/watermelondb/Schema';

import { userSchema } from './userSchema';
import { carSchema } from './carSchema';

export const schemas = appSchema({
    version: 2,
    tables: [userSchema, carSchema],
});
