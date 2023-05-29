import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { UserSchema } from '../src/user/schema';
import { RefreshTokenSchema } from '../src/auth/schema';
import { EditUserDto } from '../src/user/dto';
import { CreateNoteDto, EditNoteDto } from '../src/note/dto';
import { NoteSchema } from '../src/note/schema';

describe('App e2e', () => {
  let app: INestApplication;
  let db: Connection;

  beforeAll(async () => {
    db = await mongoose.createConnection(process.env.MONGO_URI, {});

    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(process.env.MONGO_URI), AppModule],
    }).compile();

    const userModel: Model<UserSchema> = moduleRef.get<Model<UserSchema>>(
      getModelToken(UserSchema.name),
    );
    const refreshTokenModel: Model<RefreshTokenSchema> = moduleRef.get<
      Model<RefreshTokenSchema>
    >(getModelToken(RefreshTokenSchema.name));
    const noteModel: Model<NoteSchema> = moduleRef.get<Model<NoteSchema>>(
      getModelToken(NoteSchema.name),
    );

    await userModel.deleteMany({});
    await refreshTokenModel.deleteMany({});
    await noteModel.deleteMany({});

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    app.listen(3001);

    pactum.request.setBaseUrl('http://localhost:3001');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'mail@jhondoe.com',
      password: 'jhondoe',
    };

    describe('Signup', () => {
      it('should throw an error if no body is provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should throw an error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: '123456789',
          })
          .expectStatus(400);
      });

      it('should throw an error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            enail: 'example@example.com',
          })
          .expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw an error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: '123456789',
          })
          .expectStatus(400);
      });

      it('should throw an error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            enail: 'example@example.com',
          })
          .expectStatus(400);
      });

      it('should throw an error if no body is provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token')
          .stores('userRefresh', 'refresh_token');
      });
    });

    describe('Refresh token', () => {
      it('should throw an error if provided refresh token is invalid', () => {
        const dto: { refreshToken: string } = {
          refreshToken: 'invalid',
        };

        return pactum
          .spec()
          .post('/auth/refresh')
          .withBody(dto)
          .expectStatus(401);
      });

      it('should throw an error if no body is provided', () => {
        return pactum.spec().post('/auth/refresh').expectStatus(401);
      });

      it('should refresh token', () => {
        const dto: { refreshToken: string } = {
          refreshToken: pactum.stash.getDataStore()['userRefresh'],
        };

        return pactum
          .spec()
          .post('/auth/refresh')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });

    describe('Signout', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum.spec().delete('/auth/signout').expectStatus(401);
      });

      it('should signout', () => {
        return pactum
          .spec()
          .delete('/auth/signout')
          .withBearerToken('$S{userAt}')
          .expectStatus(204);
      });

      it('should signin for other tests', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token')
          .stores('userRefresh', 'refresh_token');
      });
    });
  });

  describe('User', () => {
    describe('Get user', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum.spec().get('/user').expectStatus(401);
      });

      it('should get authorized user', () => {
        return pactum
          .spec()
          .get('/user')
          .withBearerToken('$S{userAt}')
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum.spec().patch('/user').expectStatus(401);
      });

      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Jhon',
          lastName: 'Doe',
        };

        return pactum
          .spec()
          .patch('/user')
          .withBearerToken('$S{userAt}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
    });
  });

  describe('Note', () => {
    const dto: CreateNoteDto = {
      title: 'Test title',
      content: 'Test content',
    };

    describe('Get empty notes list', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum.spec().get('/note').expectStatus(401);
      });

      it('should get empty notes list', () => {
        return pactum
          .spec()
          .get('/note')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create note', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum.spec().post('/note').expectStatus(401);
      });

      it('should throw an error if no body is provided', () => {
        return pactum
          .spec()
          .post('/note')
          .withBearerToken('$S{userAt}')
          .expectStatus(400);
      });

      it('should throw an error if title is empty', () => {
        return pactum
          .spec()
          .post('/note')
          .withBearerToken('$S{userAt}')
          .withBody({
            content: 'Test content',
          })
          .expectStatus(400);
      });

      it('should throw an error if content is empty', () => {
        return pactum
          .spec()
          .post('/note')
          .withBearerToken('$S{userAt}')
          .withBody({
            title: 'Test title',
          })
          .expectStatus(400);
      });

      it('should create note', () => {
        return pactum
          .spec()
          .post('/note')
          .withBearerToken('$S{userAt}')
          .withBody(dto)
          .stores('noteId', '_id')
          .expectStatus(201);
      });
    });

    describe('Get notes list', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum.spec().get('/note').expectStatus(401);
      });

      it('should get notes list', () => {
        return pactum
          .spec()
          .get('/note')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.content);
      });
    });

    describe('Get Note by id', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum
          .spec()
          .get('/note/{id}')
          .withPathParams({
            id: '$S{noteId}',
          })
          .expectStatus(401);
      });

      it('should get note by id', () => {
        return pactum
          .spec()
          .get('/note/{id}')
          .withPathParams({
            id: '$S{noteId}',
          })
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBodyContains('$S{noteId}');
      });
    });

    describe('Edit Note by id', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum
          .spec()
          .patch('/note/{id}')
          .withPathParams({
            id: '$S{noteId}',
          })
          .expectStatus(401);
      });

      it('should throw an error if noteId is invalid', () => {
        const dto: EditNoteDto = {
          title: 'This is an edited title',
          tags: ['NestJS', 'NodeJS'],
        };

        return pactum
          .spec()
          .patch('/note/{id}')
          .withBearerToken('$S{userAt}')
          .withPathParams({
            id: '64749df2b2c31043348e5f11',
          })
          .withBody(dto)
          .expectStatus(404);
      });

      it('should edit user', () => {
        const dto: EditNoteDto = {
          title: 'This is an edited title',
          tags: ['NestJS', 'NodeJS'],
        };

        return pactum
          .spec()
          .patch('/note/{id}')
          .withBearerToken('$S{userAt}')
          .withPathParams({
            id: '$S{noteId}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.tags);
      });
    });

    describe('Delete Note by id', () => {
      it('should throw an error if no authorization bearer is provided', () => {
        return pactum
          .spec()
          .delete('/note/{id}')
          .withPathParams({
            id: '$S{noteId}',
          })
          .expectStatus(401);
      });

      it('should delete note', () => {
        return pactum
          .spec()
          .delete('/note/{id}')
          .withPathParams({ id: '$S{noteId}' })
          .withBearerToken('$S{userAt}')
          .expectStatus(204);
      });

      it('should throw an error if noteId is invalid', () => {
        return pactum
          .spec()
          .delete('/note/{id}')
          .withPathParams({ id: '$S{noteId}' })
          .withBearerToken('$S{userAt}')
          .expectStatus(404);
      });
    });
  });
});
