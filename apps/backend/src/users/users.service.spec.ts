import type { Model } from 'mongoose';
import { User } from './user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  it('upserts by googleId and only sets googleId on insert', async () => {
    const exec = jest.fn().mockResolvedValue({ id: 'u1' });
    const findOneAndUpdate = jest.fn().mockReturnValue({ exec });
    const service = new UsersService({
      findOneAndUpdate,
    } as unknown as Model<User>);

    await service.upsertFromGoogle({
      googleId: 'g-1',
      email: 'ana@example.com',
      name: 'Ana',
    });

    expect(findOneAndUpdate).toHaveBeenCalledWith(
      { googleId: 'g-1' },
      {
        $set: { email: 'ana@example.com', name: 'Ana' },
        $setOnInsert: { googleId: 'g-1' },
      },
      expect.objectContaining({ upsert: true, new: true }),
    );
  });
});
