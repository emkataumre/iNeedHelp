import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UsersService } from '../src/users/users.service';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let uService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    uService = moduleFixture.get(UsersService);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await uService.removeAll();
  });

  describe('/business-cards (GET)', () => {
    it('should fetch all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
      const result = response.body;
      console.log(result);
    });
  });

  // describe('/business-cards (POST)', async () => {
  //   it('should create a new user', async () => {
  //     const newUser = new CreateUserDto('emkataumre', 'emo.vladinov@gmail.com');

  //     const response = await request(app.getHttpServer())
  //       .post('/users')
  //       .send(newUser)
  //       .expect(201);

  //     const result = response.body;
  //     expect(result._id).toBeDefined;
  //   });
  //   it('should create an invalid new user', async () => {
  //     const newUser = new CreateUserDto('Max2002', '');

  //     const response = await request(app.getHttpServer())
  //       .post('/users')
  //       .send(newUser)
  //       .expect(400);
  //   });

  //   const allUsers = await uService.findAll();
  //   expect(allUsers.length).toEqual(0);
  // });

  describe('/business-cards (PUT)', () => {
    it('should update a users properties', async () => {
      //Arrange
      const newUser = new CreateUserDto('emo123', 'emo@gmail.com');
      const baseUser = await uService.create(newUser);
      console.log(baseUser);

      //ACT
      const response = await request(app.getHttpServer())
        .put(`/users/${baseUser._id}`)
        .send(
          new UpdateUserDto(baseUser._id, 'updated_name', 'updated@gmail.com'),
        )
        .expect(200);

      const createdUser = response.body;
      console.log(createdUser);

      //ASSERT
      expect(createdUser.username).toEqual('updated_name');
      expect(createdUser.email).toEqual('updated@gmail.com');
    });
  });

  describe('/business-cards (DELETE)', () => {
    //
  });
});
