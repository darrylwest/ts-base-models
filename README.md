# @raincity/base-models

Shared Zod models and schemas for RainCity authentication and user management.

## Installation

Using Bun:
```bash
bun add @raincity/base-models zod
```

Using npm:
```bash
npm install @raincity/base-models zod
```

## Usage

```typescript
import { UserSchema, ContactSchema, type User, type Contact } from '@raincity/base-models';

// Validate user data
const userData = {
  key: 'usr:abc123xyz456',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  ip_address: '192.168.1.1',
  roles: 'user',
  date_created: Date.now(),
  last_updated: Date.now(),
  version: 1,
  status: 'active',
  email_verified: false
};

const user = UserSchema.parse(userData);
```

## Available Models

### Base Models

#### `Base`

The foundation model for all entities:

- `key: string` - 16-character unique identifier
- `date_created: number` - Creation timestamp
- `last_updated: number` - Last update timestamp
- `version: number` - Version number (>= 0)
- `status: BaseStatus` - Entity status (new, pending, active, inactive, verified, deleted, shipped, completed)

#### `Address`

Address information:

- `addr1: string` - Primary address line
- `addr2?: string` - Secondary address line (optional)
- `addr3?: string` - Tertiary address line (optional)
- `city: string` - City
- `state: string` - State/Province
- `zip: string` - Postal/ZIP code
- `latlng?: [number, number]` - GPS coordinates (optional)

### Person Models

#### `Person`

Extends `Base` with:

- `first_name?: string` - First name (optional)
- `last_name?: string` - Last name (optional)
- `email: string` - Email address (validated)
- `phone?: string` - Phone number (optional)
- `ip_address: string` - IP address
- `details?: Record<string, string>` - Additional details (optional)
- `email_verified: boolean` - Email verification status (default: false)
- `verification_key?: string` - Email verification key (optional)
- `verification_expires_at?: number` - Verification expiry timestamp (optional)
- `verification_sent_at?: number` - Verification sent timestamp (optional)

#### `Contact`

Extends `Person` with:

- `key: string` - 16-character identifier starting with 'con:'

#### `User`

Extends `Person` with:

- `key: string` - 16-character identifier starting with 'usr:'
- `roles: string` - User roles
- `preferences?: Record<string, string>` - User preferences (optional)
- `company_name?: string` - Company name (optional)
- `addresses?: Address[]` - Array of addresses (optional)

### Password Model

#### `UserPassword`

User password storage:

- `user_key: string` - 16-character user identifier starting with 'usr:'
- `password_hash: string` - Hashed password
- `date_created: number` - Creation timestamp
- `last_updated: number` - Last update timestamp
- `salt?: string` - Password salt (optional)

## TypeScript Support

All models are fully typed with TypeScript. You can import both the Zod schemas and the TypeScript types:

```typescript
import {
  // Schemas
  BaseSchema,
  AddressSchema,
  PersonSchema,
  ContactSchema,
  UserSchema,
  UserPasswordSchema,

  // Types
  type Base,
  type Address,
  type Person,
  type Contact,
  type User,
  type UserPassword,

  // Enums
  BaseStatus
} from '@raincity/base-models';
```

## Development

```bash
# Type check
bun run typecheck

# Install dependencies
bun install
```

## Peer Dependencies

This package requires:
- `zod` ^3.23.0 or ^4.1.0
- `typescript` ^5

Make sure these are installed in your project.

## License

Apache 2.0

###### dpw | 2025.10.07
